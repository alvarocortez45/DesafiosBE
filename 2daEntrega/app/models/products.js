const mongoose=require('mongoose')

const prodSchema= new mongoose.Schema({
    title: String,
    price: String,
    url: String,
    date: Date
})

module.exports= mongoose.model('products', prodSchema)