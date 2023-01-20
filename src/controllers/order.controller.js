import { logger } from "../utils/logger.js"
import { CarritosRepo, OrderRepo } from "../repositories/index.repositories.js";
import { sendEmailNewOrder } from "../services/nodeMailer.js";
import { sendWhatsApp, sendWhatsAppAdmin } from "../services/twilio.js";
import { actualizarStockProductos } from "../utils/stock.js";
/* ----- ----- */
const orderRepo = new OrderRepo()
const carritosRepo = new CarritosRepo()
/* ----- ----- */
const sumar = (arr) => {
    let total = 0
    for(let i = 0; i <= arr.length -1 ; i++){
        total +=arr[i]
    }
    return total
}
/* ----- ----- */
export const getOrder = async (req,res) =>{    
    try{
        logger.info('GET /order' )
        let user = req.user
        let email = user.userEmail
        let order = await orderRepo.getByEmail(email)
        if (order){
            res.status(200).render('order', {user, order })
        }else{
            res.redirect('/productos')
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error('Error en GET /order' , error)
    }
}

export const postOrder = async ( req, res ) => {
    try {
        logger.info('comprarCarrito()' )
        let user = req.user
        let total
        let orderEnviar
        const carrito = await carritosRepo.getByEmail(user.userEmail)

        if(carrito){
            logger.info("Se encontro carrito pa comprar")
            let precios = carrito.productos.map( prod => prod.producto.price)
            total = sumar(precios)
            orderEnviar = carrito.productos.map( prod => {
                return `
                    Producto: ${prod.producto.title}
                    Precio: $${prod.producto.price}
                `
            }) 
            let ordenParaMongo = await orderRepo.crearOrden( user.userEmail , user.address , carrito.productos )
    
            await actualizarStockProductos(carrito.productos)
            await sendWhatsAppAdmin(orderEnviar, total, user) // ---> Este envía a ADMIN por whatsapp la Orden ya que no deja enviar SMS a msj sin verificar
            await sendWhatsApp(orderEnviar, total , user) // ---> Este envía whatsapp a usuario su orden
            await sendEmailNewOrder(orderEnviar, total, user) // ---> Este envía correo a usuario su orden
            await carritosRepo.deleteAllProducts(user.userEmail) 
            
            let order = ordenParaMongo
            res.status(200).render('order', {user, order})
        }else{
            res.redirect('/failorder')
        }

    } catch (error) {
        logger.error('Error en comprarCarrito', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getFailOrder = async (req,res) =>{    
    try{
        logger.info('GET /fail-order' )
        let user = req.user
        res.status(200).render('order-error', { user })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error('Error en GET /order' , error)
    }
}