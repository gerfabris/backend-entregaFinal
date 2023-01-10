const server = io().connect()

const addProduct = (evt) => {
    const title = document.getElementById('title').value
    const price = parseInt(document.getElementById('price').value)
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const stock = parseInt(document.getElementById('stock').value)
    
    const producto = {
        title,
        price, 
        thumbnail,
        code,
        stock,
        description,
        category
    }

    
    server.emit('producto-nuevo', producto, (id) =>{
        console.log(id);
    })
    return false
}

const renderProductos = productos => {
    let listado = document.getElementById('list')        
    fetch('../views/partials/listaProductos.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                productos: productos,
                title: title,
                price: price,
                thumbnail: thumbnail
            })
            listado.innerHTML = html 
    })
}


/* ---- server escucha mensaje para insertar productos ------- */
server.on('mensaje-servidor-productos-admin', ( productos ) =>{
    renderProductos (productos)
})


