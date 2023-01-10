import { normalize, schema, denormalize } from 'normalizr'

const idSchema = new schema.Entity('id' );
const authorSchema = new schema.Entity('author');
const textSchema = new schema.Entity('text')

const mensajeSchema = new schema.Entity('messages', {
    id: idSchema,
    author: authorSchema,
    text: textSchema
})

export const normalizar = (mensajeOriginal) => {
    const dataNormalizada = normalize(mensajeOriginal, [mensajeSchema]);
    return dataNormalizada
}

export const desnormalizar = (dataNormalizada ) => {
    const denormalizadaData = denormalize(dataNormalizada, mensajeSchema, dataNormalizada.entities)
    return denormalizadaData
}

