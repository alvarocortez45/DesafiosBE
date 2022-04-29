const express= require ('express')
const app=express()
const productsRoute = require('./routes/productsRoute')
const cartsRoute = require('./routes/cartsRoute')

app.use(express.json())
app.use('./api/products', productsRoute)
app.use('./api/carts', cartsRoute)

module.exports= app 