import { carritosModel } from '../models/carritos.models.js'
import { ContenedorCarritosMongoDB } from './carritos/contenedorCarritosMongoDB.js'

export class CarritosFactory {
    static get(tipo){
        switch (tipo) {
            case 'mongo':
                return new ContenedorCarritosMongoDB( carritosModel ) 
            default:
                return new ContenedorCarritosMongoDB( carritosModel )
        }
    }
}

