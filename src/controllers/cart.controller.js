import { logger } from "../utils/logger.js"
import { CarritosRepo, ProductosRepo } from "../repositories/index.repositories.js";
/* ----- ----- */
const carritosRepo = new CarritosRepo()
const productosRepo = new ProductosRepo()
/* ----- ----- */
export const getCart = async (req,res) =>{    
    try{
        logger.info('GET /cart' )
        let user = req.user
        let email = user.userEmail
        let address = user.address
        let carrito = await carritosRepo.getByEmail(email)

        if(carrito){
            carrito = await carritosRepo.getByEmail(email)            
        }else{
            carrito = await carritosRepo.crearCarrito(email, address)
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
        
        let carrito = await carritosRepo.getByEmail(email)
        let producto = await productosRepo.getById(idProducto)

        if(carrito && producto){
            await carritosRepo.pushProduct(email , producto )            
            carrito = await carritosRepo.getByEmail(email)            
        }else{
            carrito = await carritosRepo.crearCarrito(email, address)
            producto = await productosRepo.getById(idProducto)

            await carritosRepo.pushProduct(email , producto )            
            carrito = await carritosRepo.getByEmail(email)
        }

        carrito = await carritosRepo.getByEmail(email)

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
        const producto = await productosRepo.getById(productId)
        const carrito = await carritosRepo.getByEmail(email)
        if(producto && carrito){
            const nuevoCarrito = await carritosRepo.pushProduct(email, producto)
        }else{
            await carritosRepo.crearCarrito( email , address )
            await carritosRepo.pushProduct(email, producto)
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
        let carrito = await carritosRepo.getByEmail(email)
        if(carrito){
            logger.info('Eliminando producto del carrito' )
            await carritosRepo.deleteProductInCart(email, idProducto)
            carrito = await carritosRepo.getByEmail(email)
        }
        res.status(200).render('cartId', {user, carrito})
    } catch (error) {
        logger.error('Error en deleteProductFromCart', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


