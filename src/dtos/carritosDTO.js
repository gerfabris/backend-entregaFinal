class CartDto {
    constructor({_id, timestamp, productos, address , email }){
        this.timestamp = timestamp
        this.email = email
        this.productos = productos
        this.address = address
        this._id = _id
    }
}

export default function asDto(data){
    if(Array.isArray(data)) return data.map(cart => new CartDto(cart))
    return new CartDto(data)
}