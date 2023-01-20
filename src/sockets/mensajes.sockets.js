import { MensajesRepo } from "../repositories/index.repositories.js"

const mensajesRepo = new MensajesRepo()

export const mensajes = async (socket, io) =>{

    const getMensajes = await mensajesRepo.getAll()
    const messages = getMensajes

    socket.emit('mensaje-servidor-chat', messages )
    socket.on('message-nuevo', async (message, cb) =>{        
        await mensajesRepo.save(message)
        const messages = await mensajesRepo.getAll()
        io.sockets.emit('mensaje-servidor-chat', messages )
    })
}

