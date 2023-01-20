import { ProductosRepo } from "../repositories/index.repositories.js"
const productosRepo = new ProductosRepo()

export const productos = async ( socket, io ) =>{

    let getProductos = await productosRepo.getAll()
    const productos =  getProductos 

    socket.emit('mensaje-servidor-productos-home', productos)
    socket.emit('mensaje-servidor-productos-admin', productos)

    socket.on('producto-nuevo', async (producto) =>{
        await productosRepo.save(producto)
        const productos = await productosRepo.getAll()

        io.sockets.emit('mensaje-servidor-productos-admin', productos)
        io.sockets.emit('mensaje-servidor-productos-home', productos)  
    })

}

