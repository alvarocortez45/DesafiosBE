const {Schema, model} = require('mongoose')

const cartSchema= new Schema ({
    fecha: Date,
    products: [{
        type: Schema.Types.ObjectId, ref: 'Products'
    }]
})

module.exports = model('Carts', cartSchema)