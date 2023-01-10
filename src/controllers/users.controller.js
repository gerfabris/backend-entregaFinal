import { logger } from "../utils/logger.js"
import { usersModel } from '../models/users.model.js'
/*  ---- models users ---- */
const Users = usersModel
/*  ---- functions ----  */
export const buscarUsuarios = async (username) => {
    try {
        let usuario = await Users.findOne({userEmail:username});
        if(usuario){
            return usuario;
        }else{
            return null
        }
    } catch (error) {
        logger.error('Error al buscar usuario en la base de datos Mongo: ' + error );
    }
}

export const crearUsuario = async (usuario) => {
    try {
        const crearUsuario = await Users.create(usuario)
        logger.info('Estamos creando');
        logger.info(crearUsuario._id.toString())
        return crearUsuario
    } catch (error) {
        logger.error('Error al crear el usuario: ' + error);
    }
}

export const getUserInfo = async (req,res) =>{    
    try{
        logger.info('GET /user' )
        let user = req.user;
        res.status(200).render('user', {user})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

