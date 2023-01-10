import passport from 'passport'
import bCrypt from "bcrypt"
import JWTStrategy from '../services/jwt.js'
import { logger } from '../utils/logger.js'
import { Strategy } from "passport-local"
const LocalStrategy = Strategy
/* ------ config user ------ */
import { buscarUsuarios, crearUsuario } from '../controllers/users.controller.js'
/* ---------- serializacion --------- */
passport.serializeUser(function (user, done) {
    logger.info("serialize user");
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    logger.info("deserialize user");
    done(null, user);
});
/*  ----- funciones -------- */
const isValidPassword = (user,password) =>{
    return bCrypt.compareSync(password, user.password)
}
const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}
/* ------ middlewares */
passport.use(
    'login' ,
    new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await buscarUsuarios(username)
            if (user) {
                if ( isValidPassword(user, password) ) {
                    return done(null, user);
                } else {
                    logger.info("password incorrecto");
                    return done(null, false);
                }
            } else {
                logger.info(`Usuario ${username} no encontrado`)
                return done(null, false);
            }
        } catch (error) {
            logger.error(error);
        }   
    })
)
passport.use(
    'signup',
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {

                let usuario = await buscarUsuarios(username)
                let newUser
                const { checkPassword } = req.body
                if(usuario) {
                    logger.info('Usuario existente');
                    return done (null, false)
                }else if (password !== checkPassword){
                    logger.info('Las contraseñas no coinciden');
                    return done (null, false)                    
                }else{
                    logger.info('Pasamos a crear al usuario');
                    const { 
                        username, 
                        password, 
                        name,
                        phone,
                        age,
                        address,
                        avatar
                    } = req.body
                    const nuevoUsuario = await crearUsuario({
                        userEmail: username ,
                        password: createHash(password),
                        name : name ,
                        phone : phone ,
                        age : age ,
                        address : address ,
                        avatar : avatar
                    })

                    newUser = await buscarUsuarios(username)
                }
                logger.info('usuario creado ');
                return done(null, newUser)
                
            } catch (error) {
                logger.error( 'Error en el strategy de signup' , error);
            }
        }
    )
)

passport.use(JWTStrategy)

export default passport;