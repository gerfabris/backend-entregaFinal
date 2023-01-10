# Trabajo final del cursor Programación Backend de Coderhouse

## Descripción

El trabajo consiste en desarrollar una api rest que conlleve la lógica de un e-commerce, dentro del repositorio se
encuentra un archivo pdf con la consigna a desarrollar.

## Link Railway


## Instalación

- Clonar el repositorio
- Ejecutar npm i o de preferencia pnpm i (tener instalado el paquete pnpm) [link](https://pnpm.io/)
- Dentro del repositorio se encuentra un archivo de colección para ser importado en postman y realizar las pruebas par
  el uso de la api

## Variables de entorno

Datos para configurar el servidor

Datos para el archivo .env

    MONGODB_URL='Dirección de la base de datos mongo'

    PORT=8080

    JWT_SECRET='clave secreta de JWT'

    MAIL='mail de nodemailer'

    MAIL_PASSWORD='password de nodemailer'

    MONGO_PASSWORD='clave para conectar con MongoDB'

    MONGO_USER='usuario para conectar con MongoDB'

    MONGO_HOST='host para conectar con MongoDB'

    MAIL_ADMIN='mail de preferencia para que lleguen los correos de prueba'

    PHONE_ADMIN='número al que llegaría la notificación de twilio'

    TWILIO_WHATSAPP_NUMBER='whatsapp:+número al que llegaría la notificación de twilio'

## Información útil

Al ingresar al localhost del servidor a traves del navegador se encontrará con una pantalla para loguearse o registrarse, 
luego de ingresar con cuenta validada, se redirije al home donde se ven los productos.
Allí contamos con un navbar que dirige a distintas secciones: perfil usuario, información servidor, carrito del usuario, webchat, y para cerrar sesión.

## Herramientas utilizadas

- JavaScript.
- Node Js.
- Express.
- MongoDB.
- Twilio.
- Nodemailer.
- JWT.
- Passport.
- bcrypt.
- compression.
- handlebars.
- morgan.
- Socket.io.
- winston.
