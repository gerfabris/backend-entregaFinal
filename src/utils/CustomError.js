export class CustomError extends Error {
    constructor( statusCode, message, description) {
        this.message = message
        this.statusCode = statusCode
        this.description = description
    }
}