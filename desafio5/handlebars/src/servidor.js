const express = require("express")
const Productos = require('../api/productos')
const handlebars = require('express-handlebars')

const contProductos = new Productos()

const routerProductos = express.Router()
const app = express()

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProductos)

app.get('/', (req, res) => {
    res.render('form');
})

routerProductos
    
    .get('/', (req, res) => {
        const productos = contProductos.productosAll
        res.render('table', {productos});
    })
    .post('/', (req, res) => {
        const prodNuevo = contProductos.saveProduct(req.body)
        res.redirect('/')
    })
    

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))