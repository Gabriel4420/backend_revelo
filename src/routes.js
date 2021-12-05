const { Router } = require('express')
const LoginController = require('./app/Controllers/LoginController')
const ProductController = require('./app/Controllers/ProductController')
const UserController = require('./app/Controllers/UserController')
const AuthMiddleware = require('./app/Middlewares/AuthMidleware')
const routes = new Router()

routes.post('/user', UserController.store)
routes.get('/users', AuthMiddleware,UserController.show)
routes.get('/products', AuthMiddleware, ProductController.show)
routes.post('/product', AuthMiddleware, ProductController.store)
routes.post('/login', LoginController.index)
routes.patch('/product/:id', AuthMiddleware,ProductController.update)

module.exports = routes
