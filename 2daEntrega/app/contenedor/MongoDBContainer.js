const mongoose= require ('mongoose')
const urlBase=process.env.DB
mongoose.connect(urlBase)

module.exports = class MongoDBContainer{
    constructor(){

    }

    async save(data){
        const addedProduct= await data.save()
        return addedProduct
    }

    async showProduct(data,id){
        const product = await data.findOne({id: id})
        return product
    }

    async list(data){
        const products = await data.find()
        return products
    }

    async listSublist(data, model){
        const elements = await data.find().populate(model)
        return elements
    }

    async update(data){
        await data.save()
        return data
    }

    async delete(data,id){
        try{
            const toDelete = await data.deleteOne({_id: id})
            return toDelete
        }catch(error){
            console.log(`Error borrando por id: ${error.message}`)
        }
    }
}