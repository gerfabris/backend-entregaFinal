import { logger } from "../utils/logger.js"

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

