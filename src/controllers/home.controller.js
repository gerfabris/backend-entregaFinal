import { ProductosApi } from "../api/index.api.js";
import { logger } from "../utils/logger.js"

let productosApi = new ProductosApi()

export const getHome = async (req,res)=>{
    try {
        logger.info('GET /home')
        if(req.user){
            let user = req.user;
            res.render('home', {user}) ;
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

export const postHome = async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /home')
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

export const getProductById = async (req,res)=>{
    try {
        logger.info('GET /productos/detail/:id')
        if(req.user){
            let user = req.user;
            let { id } = req.params
            let producto = await productosApi.getById(id)

            res.render('productDetail', {user, producto }) ;
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

export const getProductsByCategory = async (req,res)=>{
    try {
        logger.info('GET /productos/view/:category')
        if(req.user){
            let user = req.user;
            let { category } = req.body
            let productos = await productosApi.getByCategory(category)
            res.render('byCategory', {user, productos }) ;
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
