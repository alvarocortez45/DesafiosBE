const fs= require('fs').promises

module.exports = class fileController{
    constructor(file){
        this.file=file
    }

    async read(){
        try{
            const data= await fs.readFile(this.file)
            if (data.toString()!=''){
                data=JSON.parse(data)
            }else{
                data=[]
            }
            return data
        }catch(e){
            throw new Error(e.message)
        }
    }

    async saved(){
        try{
            await fs.writeFile(this.file,JSON.stringify(data,null,2))
        }catch(e){
            throw new Error(e.message)
        }
    }

    async Read(){
        try{

        }catch(e){
            throw new Error(e.message)
        }
    }

    async Read(){
        try{

        }catch(e){
            throw new Error(e.message)
        }
    }

}