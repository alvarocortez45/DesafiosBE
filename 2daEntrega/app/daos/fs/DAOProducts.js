const FileContainer= require('../../contenedor/FileContainer')
const Product = require('../../models/products')

class DAOProducts extends FileContainer{
    constructor(){
        super()
    }

    async listProducts(){
        try{
            const list= await super.list()
            return list
        }catch(e){
            throw new Error (e.message)
        }
    }

    async saveProduct(data){
        try{
            await super.save(data)
            return data
        }catch(e){
            throw new Error(e.message)
        }
    }

    async showProduct(id){
        const product = await super.showProduct(Product,id)
        return product
    }

    async deleteProduct(id){
        const product = await super.delete(Product, id)
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
}

module.exports = new DAOProducts()