import { createTransport } from 'nodemailer'
import { logger } from "../utils/logger.js"
import dotenv from 'dotenv'
dotenv.config()
/* --------- --------- */
const MAIL = process.env.MAIL
const MAIL_PASSWORD = process.env.MAIL_PASSWORD
const MAIL_ADMIN = process.env.MAIL_ADMIN
/* --------- --------- */
export const sendEmailNewUser = async ( user ) =>{
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: MAIL,
            pass: MAIL_PASSWORD,
        },
    })
    
    const mailOptions = {
        from: 'Servidor',
        to: MAIL_ADMIN,
        subject: 'Nuevo Registro',
        text: `Se ha registrado un nuevo usuario: ${user.name} con el email: ${user.userEmail}`,
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info('Mail nuevo usario' , info)
    } catch (error) {
        logger.error('Error en mailOptions', error)
    }
}
export const sendEmailNewOrder = async ( order, total, user ) =>{
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: MAIL,
            pass: MAIL_PASSWORD,
        },
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    })
    
    const mailOptions = {
        from: 'Servidor',
        to: MAIL_ADMIN, 
        subject: 'Nueva Orden',
        html: `<p>Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order} , \nTOTAL: $ ${total}</p>`,
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info('Mail nueva orden enviado' , info)
    } catch (error) {
        logger.error('Error en mailOptions', error)
    }
}
