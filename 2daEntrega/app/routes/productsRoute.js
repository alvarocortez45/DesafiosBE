const productController= require ('../controllers/products')
const {Router} = require('express')
const route = Router()

route.post('/', productController.saveProduct)
route.get('/', productController.showProducts)
route.get('/:id', productController.showProduct)
route.put('/:id', productController.updateProduct)
route.delete('/:id', productController.deleteProduct)


module.exports = route