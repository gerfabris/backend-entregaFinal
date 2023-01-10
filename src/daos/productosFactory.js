import { productosModel } from "../models/productos.model.js"
import { ContenedorProductosMongo } from "./productos/contenedorProductosMongo.js"

export class ProductosFactory {
    static get(tipo) {
        switch (tipo) {
/*             case 'sql':
                return new ContenedorProductosSQL('./productos.json'); */
            case 'mongo':
                return new ContenedorProductosMongo(productosModel) 
            default:
                return new ContenedorProductosMongo(productosModel)
        }
    }
}
