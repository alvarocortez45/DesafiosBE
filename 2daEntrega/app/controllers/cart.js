require('dotenv').config()
const DAOCart = require('../daos/'+process.env.AMBIENTE+'/CarritosDAO')

class CartController{
    async addCart (req, res) {   
        const savedCart = await cart.addCart()
        res.status(201).res.send(savedCart)
    }

    async addProduct(req, res){
        try{
            const cart= await Cart.findOne({_id:req.params.cartID})
            cart.products.push(req.params.id)
            await cart.save()
            res.send(cart)
        } catch (error) {
            console.log("Error agregando un producto al carro" + error);
        }
    }

    async addCartProduct(req, res){
        const cart = await DAOCart.addCartProduct(req.params.id, req.params.idCarrito)
        res.send(cart)
    }

    async getCarts(req,res){
        const carts= await DAOCart.getCarts()
        res.send(carts)
    }

    async deleteCartProduct(req, res){
        try{  
            const cart = await DAOCart.deleteCartProduct(req.params.cartID, req.params.id)
            res.send(cart)
        } catch (error) {
            console.log("Error agregando un producto al carro" + error);
        }
    }

    async deleteCart(req, res){
        try{
            const toDelete = await Cart.deleteCart(req.params.id)
            res.send(toDelete)
        }catch(error){
            console.log(`Error borrando por id: ${error.message}`)
        }
    }

    async getCart(req,res){
        const cart = await Cart.findOne({_id: req.params.id})
        res.send(cart)
    }
}

module.exports= new CartController()