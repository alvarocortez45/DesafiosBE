const express = require('express')
const Productos = require('../api/productos')

const contProductos = new Productos()

const routerProductos = express.Router()
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProductos)


app.get('/', (req, res) => {
    const view = 'form'
    res.render('index', {view});
})

routerProductos
    .get('/', (req, res) => {
        const productos = contProductos.productosAll
        const view = 'table'
        res.render('index', {productos, view});
    })

    .post('/', (req, res) => {
        const prodNuevo = contProductos.saveProduct(req.body)
        res.redirect('/');
    })


const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))