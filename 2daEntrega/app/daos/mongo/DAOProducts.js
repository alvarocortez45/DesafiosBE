const MongoDBContainer= require ('../../contenedor/MongoDBContainer')
const Product = require('../../models/products')

class DAOProducts extends MongoDBContainer{
    constructor(){
        super()
    }

    async saveProduct(data){
        const product1=new Product({
            title: data.title,
            price: data.price,
            url: data.url,
            date: Date().toString()
        })
        const addedProduct= await super.save(product1)
        return addedProduct
    }

    async listProducts(){
        const products = await super.list(Product)
        return products
    }

    async showProduct(id){
        const product = await super.showProduct(Product,id)
        return product
    }

    async updateProduct(data, id){
        const product = await super.showProduct(Product, id)
        product.title = data.title
        product.price = data.price
        product.url = data.url
        await super.update(product)
        return product
    }

    async deleteProduct(id){
        const toDelete = await super.delete(Producto, id)
        return toDelete
    }
}

module.exports= new DAOProducts()