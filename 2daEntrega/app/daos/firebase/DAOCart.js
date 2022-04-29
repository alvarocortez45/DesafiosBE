const FirebaseContainer = require('../../contenedor/FirebaseContainer')

class DAOCart extends FirebaseContainer{
    constructor(){
        super()
    }

    async addCart(){
        const data = {
            fecha: Date().toString()
        }
        const cart = await this.dbf.collection('carts').add(data)
        return cart
    }

    async getCarts(){
        let docs = await super.list('carts')
        const res = docs.map(doc => ({
            id: doc.id,
            fecha: doc.data().fecha,
            products: doc.data().products
        }))
        return res
    }

    async addCartProduct(productID, cartID){
        const product = await super.showElement('products', productID)
        const cart = await this.dbf.collection('carts').doc(cartID).collection('products').doc(productID).set(product)
        return cart
    }

    async deleteCartProduct(cartID, productID){
        const cart = await this.dbf.collection('carts').doc(cartID).collection('products').doc(productID).delete()
        return cart
    }


    async deleteCart(id){
        const cart = await super.delete('carts', id)
        return cart
    }

}

module.exports = new DAOCart()