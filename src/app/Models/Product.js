const mongoose = require('mongoose')

const Product = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    typeProduct: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    has_stock: {
      type: Boolean
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('product', Product)
