const moment = require("moment")
const fs = require('fs').promises
 
class Products {
    constructor(){
        this.products = [],
        this.route = './db/products.txt'
        this.id=0
    }
 
    async getProducts(){
        try{
            const productsList = await fs.readFile(this.route)
            if(productsList.toString() != ''){
                this.products = JSON.parse(productsList)
                if(this.products.length > 0){
                    this.id = parseInt(this.products[this.products.length -1].id) +1
                }else {
                    this.id = 1
                }
            }
            return this.products
        }catch(error){
            if( error.code == "ENOENT"){
                fs.writeFile(this.route,'')
                return []
            }
            console.log("Error obteniendo todos los productos " + error)
        }
    }

    async getProduct(productID){
        try {
            const allProducts = await this.getProducts()
            return allProducts.find(prod => prod.id == parseInt(productID))
        }catch(error){
            console.log("Error obteniendo un producto" + error)
        }
    }

    async saveProduct(data){   
        try{
            //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
            const allProducts= await this.getProducts();
            const newProduct = {
                id: this.id,
                timestamp: moment().format('L LTS'),
                nombre : data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio : data.precio,
                stock: data.stock
            }
            this.products.push(newProduct)
            await fs.writeFile(this.route,JSON.stringify(this.products, null, 2))
        }catch(error){
            console.log("Error guardando un producto " + error)
        }
    }

    async updateProduct(id, product) {
        try {
            const allProducts= await this.getProducts();
            const productById = allProducts.find((prod) => prod.id === parseInt(id));
            if (productById) {
                const updProduct = {
                    id: parseInt(id), 
                    timestamp: moment().format('L LTS'),
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    codigo: product.codigo,
                    foto: product.foto,
                    precio: product.precio,
                    stock: product.stock
                }
                const findIndex = allProducts.findIndex((prod) => prod.id === parseInt(id))
                allProducts[findIndex] = updProduct
                await fs.writeFile(this.route, JSON.stringify(allProducts, null, 2));
                return updProduct
            } else {
                console.log(`No se encontro el producto con id: ${id}`);
            }
        } catch (error) {
            console.log("Error actualizando" + error);
        }
    }

    async deleteByID(id){
        try{
            const allProducts= await this.getProducts()
            const deleteIndex= allProducts.findIndex((product) => product.id === parseInt(id))
            if (deleteIndex != -1){
                allProducts.splice(deleteIndex,1)
                await fs.writeFile(this.route, JSON.stringify(allProducts,null,2))
            }
        }catch(error){
            console.log(`Error borrando por id: ${error.message}`)
        }
    }

}
 
module.exports = Products