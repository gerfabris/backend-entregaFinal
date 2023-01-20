import { ProductosRepo } from "../repositories/index.repositories.js";
import { logger } from "../utils/logger.js"
/* ------ ------- */
const productosRepo = new ProductosRepo()

export const getAdmin = async (req,res)=>{
    try {
        logger.info('GET /admin')
        if(req.user){
            let user = req.user;
            res.render('admin',{user});
        }else{
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const postAdmin = async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /admin')
        if(!logout){
            res.status(200).redirect('/logout' )
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const updateProduct = async (req, res) =>{
    const { 
        title,
        price, 
        thumbnail,
        code,
        description,
        category,
        stock,
        idProducto
    } = req.body

    let producto = {         
        title,
        price, 
        thumbnail,
        code,
        description,
        category,
        stock
    }
    let id = idProducto
    try{
        logger.info('POST /admin/update')
        if(producto){
            await productosRepo.updateById(producto , id)
            logger.info('Actualizando producto')
            res.status(200).redirect('/admin' )
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}
export const deleteProduct = async (req, res) =>{
    const { idProducto } = req.body
    let id = idProducto

    try{
        logger.info('POST /admin/delete')
        if(id){
            await productosRepo.deleteById(id)
            logger.info('Eliminando producto')
            res.status(200).redirect('/admin' )
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

