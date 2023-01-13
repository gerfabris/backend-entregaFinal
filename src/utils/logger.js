import { createLogger, transports } from 'winston'
import { __dirname } from './path.js'

export const logger = createLogger({
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: `${__dirname}/../logs/warn.log`, level: 'warn' }),
        new transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
    ],
})
