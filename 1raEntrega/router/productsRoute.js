const { Router } = require('express')
const productsRoute = Router()

const isAdmin= require('../middleware/isAdmin')

const Products= require ('../api/products')
const storeProducts = new Products()

const rolAdmin=Boolean(true)

productsRoute.get('/', isAdmin(rolAdmin), async (req,res)=>{
    try{
        const products= await storeProducts.getProducts()
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

productsRoute.get('/:id', isAdmin(rolAdmin), async (req,res)=>{
    try{
        const product= await storeProducts.getProduct(req.params.id)
        if (product){
            res.status(200).json(product)
        }
        else{
            res.status(404).json({error: 'Producto no encontrado'})
        }
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

productsRoute.post('/', isAdmin(rolAdmin), async (req,res)=>{
    try{
        const product= await storeProducts.saveProduct(req.body)
        res.status(200).json(product)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

productsRoute.delete('/:id', async (req,res)=>{
    try{
        const id= Number(req.params.id)
        await storeProducts.deleteByID(id)
        res.status(200).json('Producto borrado')
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

productsRoute.put('/:id', isAdmin(rolAdmin), async (req,res)=>{
    try{
        const id= Number(req.params.id)
        await storeProducts.updateProduct(id, req.body)
        res.status(200).json("Producto actualizado")
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = productsRoute