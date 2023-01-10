import { orderModel } from '../models/order.models.js'
import { ContenedorOrderMongoDB } from './order/contenedorOrderMongoDB.js'

export class OrderFactory {
    static get(tipo){
        switch (tipo) {
            case 'mongo':
                return new ContenedorOrderMongoDB( orderModel ) 
            default:
                return new ContenedorOrderMongoDB( orderModel )
        }
    }
}

