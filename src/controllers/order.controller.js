import { logger } from "../utils/logger.js"
import { CarritosApi, OrderApi } from "../api/index.api.js";
import { sendEmailNewOrder } from "../services/nodeMailer.js";
import { sendNewOrder, sendWhatsApp, sendWhatsAppAdmin } from "../services/twilio.js";
/* ----- ----- */
const orderApi = new OrderApi()
const carritosApi = new CarritosApi() 
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
        let order = await orderApi.getByEmail(email)
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
        const carrito = await carritosApi.getByEmail(user.userEmail)

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
        }
        let ordenParaMongo = await orderApi.crearOrden( user.userEmail , user.address , carrito.productos )
        await sendWhatsAppAdmin(orderEnviar, total, user) // ---> Este envía a ADMIN por whatsapp la Orden ya que no deja enviar SMS a msj sin verificar
        //await sendWhatsApp(orderEnviar, total , user) // ---> Este envía whatsapp a usuario su orden
        await sendEmailNewOrder(orderEnviar, total, user) // ---> Este envía correo a usuario su orden
        await carrito.updateOne({ $set: { productos: [] } })
        
        let order = ordenParaMongo

        res.status(200).render('order', {user, order})
    } catch (error) {
        logger.error('Error en comprarCarrito', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}