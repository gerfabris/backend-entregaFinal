import { MensajesRepo } from "../repositories/index.repositories.js";
import { logger } from "../utils/logger.js"

const mensajesRepo = new MensajesRepo()

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
            let mensajes = await mensajesRepo.getByEmail(email)
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
