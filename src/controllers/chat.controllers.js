import { MensajesApi } from "../api/index.api.js";
import { logger } from "../utils/logger.js"

const mensajesApi = new MensajesApi()

export const getChat = async (req,res)=>{
    try {
        logger.info('GET /chat')
        if(req.user){
            let user = req.user;
            res.render('chat', {user} );
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

export const postChat = async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /chat')
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

export const getByEmail = async (req,res)=>{
    try {
        logger.info('GET /chat/:email')
        if(req.user){
            let user = req.user;
            let { email } = req.params
            //let { email } = user.userEmail
            let mensajes = await mensajesApi.getByEmail(email)
            res.render('chatByEmail', {user, mensajes} );
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
