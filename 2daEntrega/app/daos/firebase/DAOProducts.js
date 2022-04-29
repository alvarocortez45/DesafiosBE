const FirebaseContainer = require('../../contenedor/FirebaseContainer')

class DAOProducts extends FirebaseContainer{
    constructor(){
        super()
    }

    async saveProduct(data){
        const product = await super.save(data, 'products')
        return product
    }

    async listProducts(){
        const products = await super.list('products')
        return products
    }

    async showProduct(id){
        const product = await super.showElement('products', id)
        return product
    }

    async updateProduct(data, id){
        const product = await super.update('products', data, id)
        return product
    }

    async deleteProduct(id){
        const product = await super.delete('products', id)
        return product
    }

}

module.exports = new DAOProducts()