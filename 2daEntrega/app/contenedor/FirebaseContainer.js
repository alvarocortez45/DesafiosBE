const {admin, serviceAccount} = require('../config/config')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-coderhouse.acortez.firebaseio.com'
})
const db = admin.firestore()

module.exports = class FirebaseContainer{
    constructor(){
        this.dbf = db
    }

    async save(data, collection) {
        const query = db.collection(collection)
        const doc = query.doc()
        const elemento = await doc.create(data)
        return elemento
    }

    async list(collection){
        const query = db.collection(collection)
        const query2 = await query.get()
        let docs = query2.docs
        return docs
    }

    async listSublist(collection, model){

        const query = db.collection(collection).doc(model)
        const query2 = await query.get()
        let docs = query2.docs
        return docs
    }
    
    async showElement(collection, id){
        const query = db.collection(collection)
        const doc = query.doc(id)
        const item = await doc.get()
        const res = item.data()
        return res
    }
    
    async update(collection, data, id){
        const query = db.collection(collection)
        const doc = query.doc(id)
        const item = await doc.update(data, {id: id})
        return item
    }

    async delete(collection, id){
        const query = db.collection(collection)
        const doc = query.doc(id)
        const item = await doc.delete({id: id})
        return item
    }
}