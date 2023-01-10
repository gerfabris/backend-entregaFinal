import { sendEmailNewUser } from "../services/nodeMailer.js";
import { logger } from "../utils/logger.js"

export const getSignup = async (req,res)=>{
    try {
        logger.info('GET /signup')
        res.render('signup');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const postSignup = async (req,res)=>{
    try {
        logger.info('POST /signup')
        let user = req.user
        await sendEmailNewUser(user)
        res.redirect('/productos');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const getFailSignup = (req,res)=>{   
    try {
        logger.info('GET /failsignup');
        res.render('signup-error', {} ); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

export const postFailSignup = async (req,res)=>{
    try {
        logger.info('POST /failsignup');
        let user = req.user
        await sendEmailNewUser(user)
        res.redirect('/productos');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}
