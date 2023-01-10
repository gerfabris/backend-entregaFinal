import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import hbs from 'hbs'
import { config } from './config/config.js'
import { logger } from './utils/logger.js'
import { connectMongoDB } from './config/mongoDB.js'
/* ----- socket ----- */
import { Server as HttpServer } from 'http'
import { Server as IOSocket } from 'socket.io'
import { productos } from './sockets/productos.sockets.js'
import { mensajes } from './sockets/mensajes.sockets.js'
import { carrito } from './sockets/carrito.sockets.js'
/* ----- middlewares ----- */
import passport from './services/passport.js'
import { loggingExist, loggingNotExist } from './middlewares/loggings.middleware.js'
import compression from 'compression'
import { wrap } from './middlewares/wrapSocket.middleware.js'
/* ----- require routes ----- */
import routes from './routes/index.routes.js'
/* ----- config path ----- */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const absolutePath = join(__dirname, '..')
/* ----- funcion para crear el servidor ----- */
export const createServer = () => {
    /* ------ instancio servidor, socket y api ------ */
    const app = express();
    const httpServer = new HttpServer(app)
    const io = new IOSocket(httpServer)
    connectMongoDB()
    /* ---- configuración socket */
    io.on('connection', async socket => {
        logger.info('A user connected')
        productos(socket, io)
        mensajes(socket, io)
        carrito(socket, io )

    })
    /* ----- configuracion del servidor ------ */
    app.use(express.static(absolutePath + '/public')) 
    app.set('view engine', 'hbs');
    app.set('views', (absolutePath + '/public/views') )
    hbs.registerPartials(absolutePath + '/public/views/partials')

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(session(config.session))
    app.use(morgan('dev'))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(compression())
    /* -----rutas del servidor ------ */
    app.use(routes)
    /* ----- loggings general y en casos no manejados ------ */
    app.use(loggingExist)
    app.use('*', loggingNotExist)
    /* ----- socket session ------ */
    io.use(wrap(session(config.session)))
    /*  ---------------- */
    return {
        listen: port => new Promise((resolve, reject) => {
            const connectedServer = httpServer.listen(port, () => {
                resolve(connectedServer)
            })
            connectedServer.on('error', error => {
                reject(error)
            })
        })
    }
}