import { MensajesApi } from "../api/index.api.js"

const mensajesApi = new MensajesApi()

export const mensajes = async (socket, io) =>{

    const getMensajes = await mensajesApi.getAll()
    const messages = getMensajes

    socket.emit('mensaje-servidor-chat', messages )
    socket.on('message-nuevo', async (message, cb) =>{        
        await mensajesApi.save(message)
        const messages = await mensajesApi.getAll()
        io.sockets.emit('mensaje-servidor-chat', messages )
    })
}

