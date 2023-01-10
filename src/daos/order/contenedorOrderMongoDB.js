import { logger } from "../../utils/logger.js";

export class ContenedorOrderMongoDB {
    constructor(coleccion){
        this.coleccion = coleccion
    }
    async crearOrden(email, address, obj ){
        try{
            if(obj){
                const ordenNueva = await this.coleccion.create({ email: email, productos: obj , address: address})
                logger.info(`La orden fue cargada: ${ordenNueva}`);
                return ordenNueva
            }else{
                logger.info(`No se creó la orden, motivo: sin productos`);
                return null
            }
        }catch(error){
            logger.error('Error al implementar order/crearCarrito' , error);
        }
    }
    async updateOrder(producto, idOrder){
        try{
            const order = await this.coleccion.findById(idOrder)
            if (order){
                const ordenActualizada = await this.coleccion.findByIdAndUpdate(id, producto, {
                    new: true,
                    runValidators: true
                })
                logger.info('Orden actualizada')
                return ordenActualizada
            } else{
                logger.info('La orden no existe para actualizar')
                return null
            } 
        }catch(error){
            logger.error('Error al implementar order/updateCart' , error);
        }
    }

    async getById(id){
        try{
            const orden = await this.coleccion.findById({_id: id})
            if(orden){
                logger.info('La orden fue encontrada con el ID')
                return carrito
            }else{
                logger.info("No se encontró una orden con ese ID");
                return null
            }
        }catch(error){
            logger.error('Error al implementar order/getById' , error);
        }
    }
    async getByEmail(email){
        try{
            const orden = await this.coleccion.findOne({email: email})
            if(orden){
                logger.info('La orden fue encontrado con el EMAIL')
                return orden
            }else{
                logger.info("No se encontró una orden con ese EMAIL");
                return null
            }
        }catch(error){
            logger.error('Error al implementar order/getById' , error);
        }
    }
    async getAll(){
        try{
            const ordenes = await this.coleccion.find({})
            if(ordenes.length){
                logger.info('Ordenes obtenidas con getAll')
                return carritos
            }else{
                logger.info("No hay ordenes en el contenedor");
                //return carritos
                return null
            }
        }catch(error){
            logger.error('Error al implementar ordenes/getAll' , error);
        }
    }
    async deleteById(id){
        try{
            const orden = await this.coleccion.findById({_id: id})
            if(orden){
                await this.coleccion.deleteOne({_id: id})
                logger.info("Orden eliminada por ID");
            }else{
                logger.info("No se encuentra la orden para eliminar con ese id");
                return null
            }
        }catch(error){
            logger.error('Error al implementar order/deleteById' , error);
        }
    }

    async deleteAll(){
        try{
            const ordenes = await this.coleccion.find({})
            if(ordenes.length){
                await this.coleccion.deleteMany({})
                logger.info("Ordenes eliminadas");
            }else{
                logger.info("No hay ordenes para eliminar");
            }
        }catch(error){
            logger.error('Error al implementar order/deleteAll' , error);
        }
    }
    
}
