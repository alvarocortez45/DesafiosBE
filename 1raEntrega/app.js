const express = require("express")
const app = express()
const cartRoute = require ('./router/cartRoute')
const productsRoute = require ('./router/productsRoute')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/cart', cartRoute)
app.use('/api/products', productsRoute) 

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo ${req.method} NO IMPLEMENTADO`
    })
})

module.exports = app