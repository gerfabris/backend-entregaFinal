import { config } from '../config/config.js'
import { CarritosFactory } from '../daos/carritosFactory.js'
import { MensajesFactory } from '../daos/mensajesFactory.js'
import { OrderFactory } from '../daos/orderFactory.js'
import { ProductosFactory } from '../daos/productosFactory.js'

export class MensajesApi {
    constructor(){
        this.mensajesDAO = MensajesFactory.get(config.DAO_MENSAJES) 
    }
    async save (obj) {
        return await this.mensajesDAO.save(obj)
    }
    async getAll() {
        return await this.mensajesDAO.getAll()
    }
    async getByEmail(email){
        return await this.mensajesDAO.getByEmail(email)
    }
}

export class ProductosApi {
    constructor() {
        this.productosDAO = ProductosFactory.get(config.DAO_PRODUCTOS) 
    }
    async save (obj) {
        return await this.productosDAO.save(obj)
    }
    async getAll () {
        return await this.productosDAO.getAll()
    }
    async getById (id) {
        return await this.productosDAO.getById(id)
    }
    async getByCategory(category){
        return await this.productosDAO. getByCategory(category)
    }
}

export class CarritosApi {
    constructor() {
        this.carritosDAO = CarritosFactory.get(config.DAO_CARRITOS) 
    }
    async crearCarrito(email, address , obj ) {
        return await this.carritosDAO.crearCarrito(email, address , obj )
    }
    async getByEmail(email) {
        return await this.carritosDAO.getByEmail(email)
    }
    async deleteProductInCart(email, idProducto) {
        return await this.carritosDAO.deleteProductInCart(email, idProducto)
    }
    async pushProduct(email, producto) {
        return await this.carritosDAO.pushProduct(email, producto)
    }
}

export class OrderApi {
    constructor () {
        this.orderDAO = OrderFactory.get(config.DAO_ORDER)
    }
    async crearOrden(email, address, obj ){
        return await this.orderDAO.crearOrden(email, address, obj )
    }
    async updateOrder(producto, idOrder){
        return await this.orderDAO.updateOrder(producto, idOrder)
    }
    async getByEmail(email){
        return await this.orderDAO.getByEmail(email)
    }
    async deleteById(id){
        return await this.orderDAO.deleteById(id)
    }
}