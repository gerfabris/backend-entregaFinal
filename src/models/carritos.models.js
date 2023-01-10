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

export const carritosModel = mongoose.model( 'carritos', {
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
    }
})