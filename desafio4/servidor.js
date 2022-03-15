const express = require('express')
const routerProductos = express.Router()
const Productos = require('productos')

const PORT = 8080
const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServe = 500

const app = express()

app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routerProductos)
app.use(express.static('public'))

const contProductos = new Productos()

routerProductos
    .get('/', (req, res) => {
        try {
            res.status(statusOk).json(contProductos.productosAll)
        } catch(error){
            res.status(statusErrServe).json({error: error.message})
        }
    })

    .get('/:idProducto', (req, res) => {
        try {
            const producto = contProductos.getProductById(req.params.idProducto)
            if (producto){
                res.status(statusOk).json(producto)
            }else{
                res.status(statusNotFound).json({error: 'Producto no encontrado.'})
            }
        } catch(error){
            res.status(statusErrServe).json({error: error.message})
        }
    })

    .post('/', (req, res) => {
        try {
            if (req.body.title && req.body.price){
                const producto = contProductos.saveProduct(req.body)
                res.status(statusCreated).json(producto)
            }else{
                res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
            }
        } catch(error){
            res.status(statusErrServe).json({error: error.message})
        }
    })

    .put('/:idProducto', (req, res) => {
        try {
            const producto = contProductos.getProductById(req.params.idProducto)
            if (producto){

                if (req.body.title && req.body.price){
                    const productoUpdate = contProductos.updateProduct(producto.id, req.body)
                    res.status(statusOk).json(productoUpdate)
                }else{
                    res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
                }

            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            res.status(statusErrServe).json({error: error.message})
        }
    })

    .delete('/:idProduct', (req, res) => {
        try {
            const producto = contProductos.getProductById(req.params.idProducto)
            if (producto){
                contProductos.deleteProduct(producto.id)
                res.status(statusOk).json({
                    message: 'El producto ha sido eliminado',
                    producto: producto
                })
            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            res.status(statusErrServe).json({error: error.message})
        }
    })



const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))