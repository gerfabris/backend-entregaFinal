import mongoose from 'mongoose'

export const productosModel = mongoose.model('productos', {
    title: {
        type: String, 
        required: [true, 'Title is required'],
        trim: true
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        trim: true
    },
    thumbnail: {
        type: String, 
        required: [true, 'Thumbnail is required'],
        trim: true
    },
    code: {
        type: String, 
        required: [true, 'Code is required'],
        trim: true
    },
    stock: {
        type: Number, 
        required: [true, 'Stock is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    timestamp: { type: Date, default: Date.now },
})