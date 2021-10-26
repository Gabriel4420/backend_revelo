const Product = require('../Models/Product')
const yup = require('yup')
const mongoose = require('mongoose')

class ProductController {
  async show(req, res) {
    const query = Product.find().select('-_id -__v -createdAt -updatedAt')
    query instanceof mongoose.Query // true
    const products = await query
    return res.status(200).json({ error: false, products })
  }

  async store(req, res) {
    //todo: validação dos dados
    let schema = yup.object().shape({
      name: yup.string().required(),
      typeProduct: yup.string().required(),
      description: yup.string(),
      price: yup.number().required(),
      has_stock: yup.boolean(),
      quantity: yup.number().required(),
    })

    !(await schema.isValid(req.body)) &&
      res.status(400).json({
        error: true,
        message: 'Invalid format data ',
      })

    // validação que verifica se o usuário existe

    let productExist = await Product.findOne({
      name: req.body.name,
    })

    if (productExist) {
      res.status(400).json({
        error: true,
        message: 'Existing product! please create a non-existing product  ',
      })
    } else {
      // Desestruturação dos dados da requisição
      const {
        name,
        typeProduct,
        quantity,
        description,
        price,
        has_stock,
      } = req.body

      const data = {
        name,
        typeProduct,
        quantity,
        description,
        price,
        has_stock: Boolean,
      }

      if (data.quantity == 0) {
        data.has_stock = false
      } else {
        data.has_stock = true
      }

      //Inserção de usuario no MongoDB

      await Product.create(data, (error) => {
        error
          ? res.status(400).json({
              error: true,
              message: 'Error when trying to enter a product in mongoDB  ',
            })
          : res.status(200).json({
              error: false,
              message: 'Successfully registered product ',
            })
      })
    }
  }
  async update(req, res) {
    const {
      name,
      typeProduct,
      quantity,
      description,
      price,
      has_stock,
    } = req.body

    const id = req.params.id

    const product = {
      name,
      typeProduct,
      quantity,
      description,
      price,
      has_stock,
    }

    if (product.quantity == 0) {
      product.has_stock = false
    } else {
      product.has_stock = true
    }
    //todo: validação dos dados
    let schema = yup.object().shape({
      name: yup.string().required(),
      typeProduct: yup.string().required(),
      description: yup.string(),
      price: yup.number().required(),
      quantity: yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({
        error: true,
        message: 'Invalid format data ',
      })
    } else {
      try {
        const updatedProduct = await Product.updateOne({ _id: id }, product)
        req.body.quantity === 0 && req.body.has_stock == false
        if (updatedProduct.matchedCount === 0) {
          res.status(422).json({ message: 'Produto não encontrado!' })
          return
        }

        res.status(200).json({ product: product })
      } catch (err) {
        res.status(500).json({ message: `${err}` })
      }
    }
  }
}

module.exports = new ProductController()
