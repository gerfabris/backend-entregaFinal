const server = io().connect()

const addMessage = (evt) =>{
    const email = document.getElementById('email').value
    const type = document.getElementById('type').value
    const text = document.getElementById('text').value
    
    const message = {email, type , text}
    
    server.emit('message-nuevo', message, (id) =>{
        console.log(id);
    })

    return false
}

const renderMensajes =  ( messages ) =>{
    let listadoMensajes = document.getElementById('messages')
    fetch('../views/partials/mensajes.hbs')
    .then((res) => res.text())
    .then((data) =>{
        const template = Handlebars.compile(data)
        const html = template({ 
            messages: messages 
        })       
        listadoMensajes.innerHTML = html 
    })
}
/* ---- server escucha mensaje para insertar mensajes ------ */
server.on('mensaje-servidor-chat', (messages) =>{
    renderMensajes (messages)
})

