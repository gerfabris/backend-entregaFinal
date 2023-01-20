import { ProductosRepo } from "../repositories/index.repositories.js";
import { logger } from "../utils/logger.js"

let productosRepo = new ProductosRepo()

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
            let producto = await productosRepo.getById(id)

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
            let { category } = req.query
            let productos = await productosRepo.getByCategory(category)

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
