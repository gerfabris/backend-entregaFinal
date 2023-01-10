import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { logger } from '../utils/logger.js'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "coder1234"
const MONGO_USER = process.env.MONGO_USER || "german"
const MONGO_HOST = process.env.MONGO_HOST || "cluster0.yznewcb.mongodb.net"
const URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`
/*  ---- mongo sessions ---- */
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
export const mongoSessions = MongoStore.create({
    mongoUrl: URL,
    mongoOptions: mongoConfig
})
/*  ---- connection ---- */
export const connectMongoDB = async () =>{
    try {
        const url = URL
        mongoose.set('strictQuery', true);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('Error MongoDB', error);
    }
}

