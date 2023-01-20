class MensajesDto {
    constructor({_id, type, date, text , email }){
        this.type = type
        this.email = email
        this.date = date
        this.text = text
        this._id = _id
    }
}


    
export default function asDto(data){
    if(Array.isArray(data)) return data.map(msj => new MensajesDto(msj))
    return new MensajesDto(data)
}