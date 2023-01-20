import asDto from "../../dtos/mensajesDTO.js";
import { logger } from "../../utils/logger.js";

export class ContenedorMensajesMongo{
    constructor(coleccion){
        this.coleccion = coleccion
    }
    async save(obj){
        try{
            let mensaje = await this.coleccion.create(obj);
            logger.info('Mensaje guardado', obj);
            return asDto(mensaje)
        }catch(error){
            console.log( 'Error en save / mensajes' , error);
        }
    }
    async updateById(obj){
        try{
            let mensaje = await this.coleccion.findOne({ id })
            if (mensaje){
                await this.coleccion.replaceOne({_id: id}, obj)
                return asDto(mensaje)
            } else{
                return {error: "No existe el mensaje para actualizar"}
            }
        }catch(error){
            logger.error('Error en updateById / mensajes', error);
        }
    }
    async getById(id){
        try{
            let mensaje = await this.coleccion.findOne({ id })
            if(mensaje){
                logger.info('Producto obtenido por ID', mensaje);
                return asDto(mensaje)
            }else{
                logger.info("No se encontró un mensaje con ese ID", id);
                return null
            }
        }catch(error){
            logger.error('Error en getById / mensajes' , error);
        }
    }
    async getByEmail(email){
        try{
            let mensajes = await this.coleccion.find({ email: email })
            if(mensajes){
                logger.info('Mensajes obtenidos por email');
                return asDto(mensajes)
            }else{
                logger.info("No se encontró un mensaje con ese email", id);
                return null
            }
        }catch(error){
            logger.error('Error en getById / mensajes' , error);
        }
    }
    async getAll(){
        try{
            const mensajes = await this.coleccion.find({})
            if(mensajes.length > 0){
                logger.info('Mensajes obtenidos');
                return asDto(mensajes)
            }else{
                logger.info("No hay mensajes para mostrar");
                return null
            } 
        }catch(error){
            logger.error('Error en getAll / mensajes', error);
        }
    }
    async deleteById(id){
        try{
            const mensaje = await this.coleccion.findOne({ id })
            if (mensaje){
                let mensajeoEliminado = await this.coleccion.deleteOne({ id })
                logger.info(`Se ha eliminado el mensaje ${id}`);
            }else{
                logger.info("No se encuentra el mensaje para eliminar");
            }
        }catch(error){
            logger.error( 'Error en deleteById' , error);
        }
    }
    async deleteAll(){
        try{
            const mensajes = await this.coleccion.find({})
            if(mensajes){
                let mensajesEliminados = await this.coleccion.deleteMany({})
                logger.info("Mensajes eliminados");
            }else{
                logger.info("No hay mensajes para eliminar");
            }
        }catch(error){
            logger.error( 'Error en deleteAll / mensajes', error);
        }
    }
}

