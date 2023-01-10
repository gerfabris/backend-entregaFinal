const server = io().connect()

/* const renderCarrito = (carrito) => {
    let listado = document.getElementById('list')        
    fetch('../views/partials/productosCarrito.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                carrito: carrito,
            })
            listado.innerHTML = html 
    })
} */

const renderTotal = (total) => {
    let listado = document.getElementById('total')        
    fetch('../views/partials/total.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                total: total,
            })
            listado.innerHTML = html 
    })
}

const eliminarProducto = () => {
    server.emit('eliminar-producto', (id) =>{
        console.log(id);
    })
}

/* const comprarCarrito = () => {
    server.emit('comprar-carrito', (id) =>{
        console.log(id);
    })
} */

const vaciarCarrito = () => {
    server.emit('vaciar-carrito', (id) =>{
        console.log(id);
    })
}

/* ---- server escucha mensaje para insertar productos ------- */
server.on('mensaje-servidor-carrito', ( carrito, total ) =>{
    //renderCarrito (carrito)
    renderTotal(total)
})