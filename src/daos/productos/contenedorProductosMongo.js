import { logger } from "../../utils/logger.js";
import asDto from "../../dtos/productosDTO.js";

export class ContenedorProductosMongo{
    constructor(coleccion){
        this.coleccion = coleccion
    }

    async save(obj){
        try{
            let producto = await this.coleccion.create(obj);
            logger.info('Producto guardado', producto);
            return asDto(producto)
        }catch(error){
            logger.error('Error en save / productos', error);
        }
    }
    async updateById(obj , id){
        try{
            let producto = await this.coleccion.findOne({ _id: id })
            if (producto){
                await this.coleccion.replaceOne({_id: id}, obj)
                return asDto(producto)
            } else{
                return {error: "No existe el producto"}
            }
        }catch(error){
            logger.error('Error en updateById / productos', error);
        }
    }
    async getById(id){
        try{
            let producto = await this.coleccion.findOne({ _id: id })
            if(producto){
                logger.info('Producto obtenido por ID', producto);
                return asDto(producto)
            }else{
                logger.info("No se encontró un producto con ese ID", id);
                return null
            }
        }catch(error){
            logger.error('Error en getById / productos', error);
        }
    }
    async getAll(){
        try{
            const productos = await this.coleccion.find({})
            if(productos){
                logger.info('Productos obtenidos');             
                return asDto(productos)
            }else{
                logger.info("No hay productos en el contenedor");
                return null
            } 
        }catch(error){
            logger.error('Error en getAll / productos', error);
        }
    }

    async getByCategory(category){
        try{
            let productos = await this.coleccion.find({ category: category })
            if(productos){
                logger.info('Productos obtenidos por categoría');
                return asDto(productos)
            }else{
                logger.info("No se encontró productos con esa categoría", category);
                return null
            }
        }catch(error){
            logger.error('Error en getById / productos', error);
        }
    }

    async deleteById(id){
        try{
            const producto = await this.coleccion.findOne({ _id: id })
            if (producto){
                let productoEliminado = await this.coleccion.deleteOne({ _id: id })
                logger.info(`Se ha eliminado el producto ${id}`);
            }else{
                logger.info("No se encuentra el producto para eliminar");
            }
        }catch(error){
            logger.error('Error en deleteById / productos', error);
        }
    }
    async deleteAll(){
        try{
            const productos = await this.coleccion.find({})
            if(productos){
                let productosEliminados = await this.coleccion.deleteMany({})
                logger.info("Productos eliminados");
            }else{
                logger.info("No hay productos para eliminar");
            }
        }catch(error){
            logger.error('Error en deleteAll / productos', error);
        }
    }
}
