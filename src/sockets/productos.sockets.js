import { ProductosApi } from "../api/index.api.js"
const productosApi = new ProductosApi()

export const productos = async ( socket, io ) =>{

    let getProductos = await productosApi.getAll()
    const productos =  getProductos 

    socket.emit('mensaje-servidor-productos-home', productos)
    socket.emit('mensaje-servidor-productos-admin', productos)

    socket.on('producto-nuevo', async (producto) =>{
        await productosApi.save(producto)
        const productos = await productosApi.getAll()
        io.sockets.emit('mensaje-servidor-productos-admin', productos)
        io.sockets.emit('mensaje-servidor-productos-home', productos)  
    })
}

