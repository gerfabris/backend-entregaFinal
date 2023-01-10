import mongoose from "mongoose"

const productosEnCarrito = mongoose.Schema({
    producto: {
        type: Object ,
        unique: true,
    },
    quantity: {
        type: Number,
        min: 1 ,
        default: 1
    }
})

export const orderModel = mongoose.model( 'ordenes', {
    timestamp: { type: Date, default: Date.now },
    email:{
        type: String,
        required: true,
    },
    productos: {
        type: [productosEnCarrito],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 'generada'
    }
})