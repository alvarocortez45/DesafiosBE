class Productos{
    constructor(){
        this.productos = []
        this.sequenceId = 0
    }

    get productosAll(){
        try {
            return this.productos
        } catch(error){
            throw new Error(`Se produjo un error: ${error.message}`)
        }
    }

    saveProduct(producto){
        try{

            this.sequenceId++
            const newProducto = {
                title: producto.title,
                price: producto.price,
                thumbnail: 'https://via.placeholder.com/150',
                id: this.sequenceId
            }
            this.productos.push(newProducto)
            return newProducto

        } catch(error){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${error.message}`)
        }
    }

    getProductById(idProducto){
        try {
            return this.productos.find(producto => producto.id == parseInt(idProducto))
        } catch(error){
            throw new Error('Hubo un error al buscar el producto requerido')
        }
    }


    updateProduct(idProducto, producto){
        try {
            const productosTemp = []
            let productoUpdate = {}

            this.productos.forEach(prod => {
                if (prod.id == idProducto){
                    productoUpdate = {
                        title: producto.title,
                        price: producto.price,
                        thumbnail: 'https://via.placeholder.com/150',
                        id: idProducto
                    }
                    productosTemp.push(productoUpdate)
                }else{
                    productosTemp.push(prod)
                }
            })
            this.productos = productosTemp
            return productoUpdate
        } catch(error){
            throw new Error(`Ocurrió un error al actualizar: ${error.message}`)
        }
    }

    deleteProduct(idProducto){
        try {
            this.productos = this.productos.filter(prod => prod.id != idProducto)
        } catch(error){
            throw new Error(`Ocurrió un error al eliminar: ${error.message}`)
        }
    }
}

module.exports = Productos