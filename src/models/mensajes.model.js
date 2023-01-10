import mongoose from "mongoose"

export const mensajesModel = mongoose.model('mensajes', {
    email: {
        type: String, 
        required: true,
        trim: true
    },
    type: {
        type: String,
        default: 'user',
        trim: true
    },
    date: { type: Date, default: Date.now },
    text: { 
        type: String, 
        required: true,
        trim: true
    },
})



