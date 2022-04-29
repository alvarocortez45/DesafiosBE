const fs = require('fs').promises

module.exports = class FileContainer{
    constructor(){
        this.file = '../../__temporal__/productos.txt'
    }

    async list(){
            let data = await fs.readFile(this.file)
            if (data.toString() != ''){
                data = JSON.parse(data)
            }else{
                data = []
            }

            return data
    }

    async showProduct(data, id){
        let toReturn= null
        const arr= this.list(data)
        let b =false
        let i=0
        while (i<=arr.length && b==false)
            if (arr[i]==id)
                b=true
            else i++
        if (b==true)
            toReturn=arr[i]
        return toReturn
    }


    async list(data){
        const res= JSON.parse(await fs.writeFile(this.file, JSON.stringify(data, null, 2)))
        return res
    }

    async save(data){
            await fs.writeFile(this.file, JSON.stringify(data, null, 2))
    }

    async update(product){
        try{
            await fs.appendFile(this.file, JSON.stringify(product, null, 2))
            return arr
        }catch(e){
        throw new Error(e.message)
    }
    }

    async delete(data, id){
        const arr= this.list(data)
        let b =false
        let i=0
        while (i<=arr.length && b==false)
            if (arr[i]==id)
                b=true
            else i++
        if (b==true){
            arr[i]==arr[arr.length-1]
            await fs.writeFile(this.file, JSON.stringify(arr, null, 2))
        }
        return arr
    }

}