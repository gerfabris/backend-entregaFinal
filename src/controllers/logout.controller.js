import { logger } from "../utils/logger.js"

export const getLogout = async (req, res) =>{
    try{
        logger.info('GET /logout')
        const logout = () => {
            req.session.destroy()
        }
        setTimeout(
            logout, 2000
        )
        if(req.user){
            let username = req.user.userEmail;
            logger.info(username);
            res.render('logout', {username: username})
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

