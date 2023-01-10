/* import ContenedorMensajesArchivo from './mensajes/contenedorMensajeArchivo'
import ContenedorMensajesSQLite from './mensajes/contenedorMensajesSQLite' */
import { mensajesModel } from '../models/mensajes.model.js'
import { ContenedorMensajesMongo } from './mensajes/contenedorMensajesMongo.js'

export class MensajesFactory {
    static get(tipo){
        switch (tipo) {
/*             case 'file':
                return new ContenedorMensajesArchivo( './databases/mensajes.json');
            case 'sqlite':
                return new ContenedorMensajesSQLite('./databases/ecommerce.sqlite') */
            case 'mongo':
                return new ContenedorMensajesMongo(mensajesModel) 
            default:
                return new ContenedorMensajesMongo(mensajesModel)
        }
    }
}

