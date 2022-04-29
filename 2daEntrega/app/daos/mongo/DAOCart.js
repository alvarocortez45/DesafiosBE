const MongoDBContainer= require ('../../contenedor/MongoDBContainer')
const Product = require('../../models/products')
const Cart = require('../../models/carts')

class DAOCart extends MongoDBContainer{
    constructor(){
        super()
    }

    async addCart(){
        const cart = new Cart({
            date: Date().toString()
        })
        const savedCart = await super.save(cart)
        return savedCart
    }

    async listCarts () {
        const carts = await super.listSublist(Cart, 'products')
        return carts
    }

    async addCartProduct(productID, cartID){
        const cart = await super.showProduct(Cart, cartID)
        cart.products.push(productID)
        await super.update(carrito)
        return cart
    }


    async deleteCartProduct(cartID, productID){
        const cart = await super.showProduct(Cart, cartID)
        cart.products = cart.products.filter(prod => prod != productID)
        await super.update(cart)
        return cart
    }


    async deleteCart(id){
        const toDelete = await super.delete(Cart, id)
        return toDelete
    }
}

module.exports = new DAOCart()