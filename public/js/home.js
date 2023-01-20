const server = io().connect()

const renderProductos = productos => {
    let listado = document.getElementById('list')        
    fetch('../views/partials/cardsProductos.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                productos: productos
            })
            listado.innerHTML = html 
    })
}

const agregarProducto = (evt) => {

    server.emit('agregar-producto-alCarrito',  (id) =>{
        console.log(id);
    })
    return false
}

/* ---- server escucha mensaje para insertar productos ------- */
server.on('mensaje-servidor-productos-home', ( productos ) =>{
    renderProductos ( productos )
})



