import { logger } from "../utils/logger.js"

export const loggingExist = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`)
    next()
}

export const loggingNotExist = (req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ruta inexistente!`)
    next()
}