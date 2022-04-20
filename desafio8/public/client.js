const socket = io();

socket.on("products", listProds => {
    loadProds(listProds)
});

socket.on("messages", data =>{
    loadMessages(data)
})

function loadMessages(data) {
    const html = data.map((elem, index) => {
        return(`<div class="direct-chat-info clearfix">
                        <span id="chatName" class="direct-chat-name pull-right">${elem.email}</span>
                    <span id= "chatDate" class="direct-chat-timestamp pull-left">${elem.date}</span>
                </div>
                        <div id="chatText" class="direct-chat-text">${elem.text}</div>
                    `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

document.getElementById('frm').addEventListener('submit', (e)=> {
    e.preventDefault()
    agregarMensaje()
})

function agregarMensaje() {
    const newMessage = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value,
    }
    socket.emit("newMessage",newMessage)
}

async function loadProds(listProd) {
    let htmlProd = {}
    const tableList = await fetch('views/partials/table.ejs').then(res => res.text())

    if (listProd.length === 0){
        htmlProd = `No se encontraron Productos`
    }else{
        htmlProd = ejs.render(tableList, {productsList})
            
    }
    document.getElementById('NuevaTabla').innerHTML = htmlProd;
        
}

document.getElementById('btn').addEventListener('click', ()=> {
    const producto = {
        name: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail:document.getElementById('url').value
    }
socket.emit('newProduct', producto)});