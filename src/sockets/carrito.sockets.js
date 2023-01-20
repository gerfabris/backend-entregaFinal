import { logger } from "../utils/logger.js"
import { CarritosRepo } from "../repositories/index.repositories.js";

const carritosRepo = new CarritosRepo()

const sumar = (arr) => {
    let total = 0
    for(let i = 0; i <= arr.length -1 ; i++){
        total +=arr[i]
    }
    return total
}

export const carrito = async (socket, io ) => {
    try {
        let user = socket.request.session.passport.user
        let email = user.userEmail
        let address = user.address
        let total

        let carrito = await carritosRepo.getByEmail(email)

        if(carrito){
            let arr = carrito.productos.map( prod => prod.producto.price )
            total = sumar(arr)

            socket.emit('mensaje-servidor-carrito', carrito, total )
        }else{            
            carrito = await carritosRepo.crearCarrito( email, address )

            let arr = carrito.productos.map( prod => prod.producto.price )
            total = sumar(arr)

            socket.emit('mensaje-servidor-carrito', carrito, total )
        }

        socket.on('agregar-producto-alCarrito', async () => {
            let user = socket.request.session.passport.user           
            let email = user.userEmail
            let address = user.address
            let total

            let carrito = await carritosRepo.getByEmail(email)

            if(carrito){
                carrito = await carritosRepo.getByEmail(email)

                let arr = carrito.productos.map( prod => prod.producto.price )
                total = sumar(arr)
                io.sockets.emit('mensaje-servidor-carrito', carrito , total)
            }else{                
                carrito = await carritosRepo.crearCarrito( email, address )
                carrito = await carritosRepo.getByEmail(email)

                let arr = carrito.productos.map( prod => prod.producto.price )
                total = sumar(arr)

                io.sockets.emit('mensaje-servidor-carrito', carrito , total)
            }
        })

        socket.on('eliminar-producto', async () => {
            let user = socket.request.session.passport.user           
            let email = user.userEmail
            let address = user.address
            let total

            let carrito = await carritosRepo.getByEmail(email)

            if(carrito){
                carrito = await carritosRepo.getByEmail(email)

                let arr = carrito.productos.map( prod => prod.producto.price )
                total = sumar(arr)
                io.sockets.emit('mensaje-servidor-carrito', carrito , total)
            }else{                
                carrito = await carritosRepo.crearCarrito( email, address )
                carrito = await carritosRepo.getByEmail(email)

                let arr = carrito.productos.map( prod => prod.producto.price )
                total = sumar(arr)

                io.sockets.emit('mensaje-servidor-carrito', carrito , total)
            }
        })

        socket.on('vaciar-carrito', async (productId) => {
            let user = socket.request.session.passport.user
            let email = user.userEmail 
            let carrito = await carritosRepo.getByEmail(email)
            
            if(carrito){           
                total = 0
                await carritosRepo.deleteAllProducts(email)              

                socket.emit('mensaje-servidor-carrito', carrito, total )
            }else{            
                carrito = await carritosRepo.crearCarrito( email, address )
                total = 0

                socket.emit('mensaje-servidor-carrito', carrito, total )
            }
        })

        socket.on('comprar-carrito', async () => {
            console.log("Comprando")
            let user = socket.request.session.passport.user
            const carrito = await carritosRepo.getByEmail(user.userEmail)
            if(carrito){
                console.log("Se encontro carrito pa comprar")
                let precios = carrito.productos.map( prod => prod.price)
                let total = sumar(precios)
                let order = carrito.productos.map( prod => {
                    return `
                        Producto: ${prod.title}
                        Precio: $${prod.price}
                    `
                }) 

                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }
        })

    } catch (error) {
        logger.error('Error en carrito.socket', error)
    }
}
