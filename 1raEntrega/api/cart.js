const fs= require ('fs').promises
const moment= require ('moment')

class cart{
    constructor(){
        this.route='./db/cart.txt'
        this.cart=[]
        this.id=1
    }

    async createCart(){
        try{
            const allCarts = await this.getAllCarts()
            const newCart = {
                id: this.id, 
                timestamp: moment().format('L LTS'),
                products: []
            }
            allCarts.push(newCart)
            await fs.writeFile(this.route, JSON.stringify(allCarts ,null, 2))
            return newCart
        }catch(error){
            console.log("Error creando un carrito " + error)
        }
    } 

    async deleteCart(cartID){
        try{
            const allCarts = await this.getAllCarts()
            const toDelete = allCarts.findIndex((cart) => cart.id === parseInt(cartID))
            if (toDelete != -1 ){
                const deleteData = allCarts.splice(toDelete,1)
                await fs.writeFile(this.route, JSON.stringify(allCarts ,null, 2))
                return deleteData
            } 
        }catch (error) {
            console.log("Error borrando un carrito " + error)
        }
    }

    async getAllCarts(){
        try{
            const cartList= await fs.readFile(this.route)
            if (cartList.toString()!=''){
                this.cart = JSON.parse(cartList)
                if (this.cart.length > 0){
                    this.id= parseInt(this.cart[this.cart.length-1].id)+1
                } else{
                    this.id = 1
                }
            }
            return this.cart
        }catch(error){
            if (error.code=="ENOENT"){
                fs.writeFile(this.route, '')
                return []
            }
        } 
        console.log("Error recuperando los carritos"+error)
    }

    async deleteCartProduct(cartID, productID){
        try{
            const allCarts = await this.getAllCarts()
            const cartById = allCarts.find(cart => cart.id == parseInt(cartID))
            if(cartById){
                const cartIndex = allCarts.findIndex((cart) => cart.id === parseInt(cartID))
                const toDelete = cartById.products.findIndex((prod) => prod.id === parseInt(productID))
                if (toDelete != -1 ){
                    cartById.products.splice(toDelete,1) 
                    allCarts[cartIndex] = cartById
                    await fs.writeFile(this.route, JSON.stringify(allCarts ,null, 2))
                    return cartById
                }
            }else {
                throw new Error("No se encontró el carrito")
            }

        }catch (error) {
            throw new Error(error.message)
        }
    }

    async listCartProducts(cartID){
        try{
            const allCarts = await this.getAllCarts()
            const cartById = allCarts.find(cart => cart.id == parseInt(cartID))
            return cartById.products
        }catch (error){
            console.log("Error recuperando la lista de productos de un carrito " + error)
        }
    }

    async addCartProduct(cartID, product) {
        try {
            const allCarts = await this.getAllCarts()
            const cartById = allCarts.find(cart => cart.id == parseInt(cartID))
            if (cartById) {
                cartById.products.push(product)
                await fs.writeFile(this.route, JSON.stringify(allCarts ,null, 2))
                return cartById
            }else {
                throw new Error("No se encontró el carrito")
            }
        }catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = cart