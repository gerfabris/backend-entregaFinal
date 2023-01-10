import { logger } from "../utils/logger.js"

export const getLogin = async (req,res)=>{
    try {
        logger.info(`GET /login`);
        if(req.isAuthenticated()){
            logger.info('user logeado');
            res.redirect('/productos');
        }else{
            logger.info('usuario NO logeado');
            res.render('login');
        }  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const postLogin = async (req,res)=>{
    try {
        logger.info(`POST /login`)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const getFailLogin = async (req,res)=>{
    try {
        logger.info(`GET /faillogin`)
        res.render('login-error' );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const postFailLogin = async (req,res)=>{
    try {
        logger.info(`POST /faillogin`)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}
