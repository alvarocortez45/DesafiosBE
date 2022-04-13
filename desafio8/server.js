const express = require('express');
const { get } = require('express/lib/response');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const Container = require("./src/contenedor");
const { optionsMySQL } = require("./src/DB/optionsMySQL");
const { optionsSQLite } = require("./src/DB/optionsSQLite");

const tableProducts = "products";
const tableMessages = "messages";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const apiProducts = new Container(optionsMySQL, tableProducts);
const apiMessages = new Container(optionsSQLite, tableMessages);


app.get('/', (req, res) => {res.render('index');})


io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    
    socket.emit("products", await apiProducts.listAll());
  
    socket.on("newProduct", async (product) => {
      await apiProducts.save(product);
      //Actualización de la vista de productos
      io.sockets.emit("products", await apiProducts.listAll());
    });
  
    socket.emit("messages", await apiMessages.listAll());
  
    socket.on("newMessage", async (msg) => {
      msg.date = new Date().toLocaleString();
      await apiMessages.save(msg);
  
      io.sockets.emit("messages", await apiMessages.listAll());
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./public/views");

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchado en puerto ${server.address().port}`);
});

server.on("error", (error) => console.error(`Error en servidor ${error}`));