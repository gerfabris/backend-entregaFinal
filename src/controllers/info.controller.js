import { logger } from "../utils/logger.js"

export const getInfo = async (req,res) =>{    
    try{
        logger.info('GET /info' )
        const proceso = process.memoryUsage()
        const respuesta = {
            argumentos: process.argv.slice(2),
            plataforma: process.platform,
            version: process.version,
            rss: JSON.stringify(proceso),
            path: process.argv[1],
            id: process.pid,
            memoriaReservada: parseInt(process.memoryUsage().rss / 1024 / 1024),
            carpeta: process.cwd(),
            idProceso: process.pid ,   
        }
        res.status(200).render('info', {respuesta})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}
