require('dotenv').config()
const DAOProducts= require('../daos/'+process.env.AMBIENTE+'/DAOProducts') 

class ProductsController{
    async saveProduct(req,res){
        const addedProduct= await DAOProducts.saveProduct(req.body)
        res.send(addedProduct)
    }

    async showProducts(req,res){
        const product = await DAOProducts.listProducts(req.params.id)
        res.send(product)
    }

    async showProduct(req,res){
        const product= await DAOProducts.showProduct(req.params.id)
        res.send(product)
    }

    async updateProduct(req,res){
        const product= await DAOProducts.updateProduct(req.body, req.params.id)
        res.send(product)
    }

    async deleteProduct(req,res){
        try{
            const toDelete= await DAOProducts.deleteProduct(req.params.id)
            res.send(toDelete)
        }catch(error){
            console.log(`Error borrando por id: ${error.message}`)
        }
    }
}

module.exports = new ProductsController()