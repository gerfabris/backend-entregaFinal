class ProductoDto {
    constructor({_id, title, price, thumbnail, description, category, code, stock}){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.description = description
        this.category = category
        this.code = code
        this.stock = stock
        this._id = _id
    }
}

export default function asDto(productos){
    if(Array.isArray(productos)) return productos.map(prod => new ProductoDto(prod))
    return new ProductoDto(productos)
}