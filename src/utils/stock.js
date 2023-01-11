import { productosModel } from "../models/productos.model.js";
import { logger } from "./logger.js";
/* ----- ----- */
export const actualizarStockProductos = async (productos) => {
    try {
        for( let prod of productos){
            let stockNuevo = prod.producto.stock - prod.quantity
            await productosModel.updateOne( {_id: prod.producto.id } , {$set: {stock: stockNuevo } } )
        }
        logger.info('Stock actualizado')
    } catch (error) {
        logger.error('Error al actualizar el stock' , error)
    }
}