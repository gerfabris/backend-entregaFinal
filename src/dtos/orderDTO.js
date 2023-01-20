class OrderDto {
    constructor({_id, timestamp, productos, address, status , email }){
        this.timestamp = timestamp
        this.email = email
        this.productos = productos
        this.address = address
        this.status = status
        this._id = _id
    }
}

export default function asDto(data){
    if(Array.isArray(data)) return data.map(ord => new OrderDto(ord))
    return new OrderDto(data)
}