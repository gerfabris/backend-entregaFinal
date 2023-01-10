import mongoose from 'mongoose'

export const usersModel = mongoose.model('usuarios', {
    userEmail: {
        type: String, 
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },    
})