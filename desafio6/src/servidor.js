const { Console } = require('console')
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Contenedor = require('../clases/productos.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new Contenedor('productos.json')
const mensajesApi = new Contenedor('chat.json')

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


io.on('connection', async socket => {
    console.log('Cliente conectado');

    socket.emit('verProductos', await productosApi.listarAll());

    socket.on('actualizarProductos', async producto => {
       await  productosApi.guardar(producto)
        console.log(productosApi.listarAll())
        io.sockets.emit('verProductos', await productosApi.listarAll());
    })

    socket.emit('verMensajes', await mensajesApi.listarAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        io.sockets.emit('verMensajes', await mensajesApi.listarAll());
    })
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error: ${error}`))