import { logger } from "../utils/logger.js"
import { CarritosApi, OrderApi , ProductosApi } from "../api/index.api.js";
import { sendEmailNewOrder } from "../services/nodeMailer.js";
import { sendNewOrder, sendWhatsApp, sendWhatsAppAdmin } from "../services/twilio.js";
/* ----- ----- */
const carritosApi = new CarritosApi()
const productosApi = new ProductosApi()
const orderApi = new OrderApi()
/* ----- ----- */
export const getCart = async (req,res) =>{    
    try{
        logger.info('GET /cart' )
        let user = req.user
        let email = user.userEmail
        let address = user.address
        let carrito = await carritosApi.getByEmail(email)

        if(carrito){
            carrito = await carritosApi.getByEmail(email)            
        }else{
            carrito = await carritosApi.crearCarrito(email, address)
        }

        res.status(200).render('cart', {user, carrito })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error('Error en GET /cart' , error)
    }
}

export const addToCart = async (req,res) =>{    
    try{
        logger.info('PUT /cart' )
        let user = req.user
        let email = user.userEmail
        let address = user.address
        const { idProducto } = req.body
        
        let carrito = await carritosApi.getByEmail(email)
        let producto = await productosApi.getById(idProducto)

        if(carrito && producto){
            //producto = await productosApi.getById(idProducto)

            await carritosApi.pushProduct(email , producto )            
            carrito = await carritosApi.getByEmail(email)            
        }else{
            carrito = await carritosApi.crearCarrito(email, address)
            producto = await productosApi.getById(idProducto)

            await carritosApi.pushProduct(email , producto )            
            carrito = await carritosApi.getByEmail(email)
        }

        carrito = await carritosApi.getByEmail(email)

        res.status(200).render('cart', {user, carrito})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error('Error en PUT /cart' , error)
    }
}

export const postCart = async (req,res) =>{    
    try{
        logger.info('POST /cart' )
        let user = req.user
        let { productId } = req.body
        let email = user.userEmail
        let address = user.address
        const producto = await productosApi.getById(productId)
        const carrito = await carritosApi.getByEmail(email)
        if(producto && carrito){
            const nuevoCarrito = await carritosApi.pushProduct(email, producto)
        }else{
            await carritosApi.crearCarrito( email , address )
            await carritosApi.pushProduct(email, producto)
        }
        res.status(200).render('cart', {user, carrito})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error('Error en POST /cart' , error)
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        logger.info('GET /cart/:idProducto' )
        const user = req.user
        const email = user.userEmail
        const { idProducto } = req.params

        let carrito = await carritosApi.getByEmail(email)

        await carrito.updateOne({ $pull: { productos: { _id: idProducto } } })
        carrito = await carritosApi.getByEmail(email)

        res.status(200).render('cartId', {user, carrito})
    } catch (error) {
        logger.error('Error en deleteProductFromCart', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/* export const vaciarCarrito = async ( req, res ) => {
    try {
        console.log("Vaciar")
        let user = req.user
        let email = user.userEmail 
        let carrito = await carritosApi.getByEmail(email)
        
        if(carrito){           
            total = 0
            await carrito.updateOne({ $set: { productos: [] } })  
            carrito = await carritosApi.getByEmail(email)
            res.status(200).render('cart', {user, carrito})              
        }
    }catch (error) {
        logger.error('Error en vaciarCarrito', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} */

