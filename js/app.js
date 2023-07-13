let menuHamburguesas = [];
let carrito = [];


menuHamburguesas.push(new Burguers('Maggie', 1900, 'simple'));
menuHamburguesas.push(new Burguers('Marge', 2100, 'simple'));
menuHamburguesas.push(new Burguers('Apu', 2600, 'veggie'));
menuHamburguesas.push(new Burguers('Bart', 2700, 'doble'));
menuHamburguesas.push(new Burguers('Barney Gómez', 2500, 'doble'));
menuHamburguesas.push(new Burguers('Homero', 3100, 'triple'));
menuHamburguesas.push(new Burguers('Lisa', 3300, 'triple'));

menuHamburguesas = localStorage.setItem('menu', JSON.stringify(menuHamburguesas));
carrito = localStorage.setItem('carrito', JSON.stringify(carrito));


function recuperoArrays(){
    menuHamburguesas = JSON.parse(localStorage.getItem('menu')) || [];
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
}


const listadoHamburguesas = document.getElementById('listadoHamburguesas');
const tabla = document.getElementById('bodyTabla');
const botonAgregar = document.getElementById('agregar');
const totalCarrito = document.getElementById('totalCarrito');
const vaciarCarrito = document.getElementById('vaciar');

recuperoArrays();
cargaListado();

function cargaListado(){
menuHamburguesas.forEach((item, index) => {
let opciones = document.createElement('option');
opciones.value = index;
opciones.textContent = `Burguer "${item.nombre}"  ${item.tipo}`;
listadoHamburguesas.appendChild(opciones);
})
};

function agregandoFilas(item, index){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = item.producto.nombre;
    td.classList.add('text-dark')
    tr.appendChild(td);

    td = document.createElement('td');
    td.textContent = item.cantidad;
    td.classList.add('text-dark')
    tr.appendChild(td);

    td = document.createElement('td');
    td.textContent = item.producto.precio;
    td.classList.add('text-dark')
    tr.appendChild(td);

    td = document.createElement('td');
    let btnEliminar = document.createElement('button');
    btnEliminar.textContent = `Eliminar selección`;
    btnEliminar.classList.add('btn','btn-danger');
    btnEliminar.onclick = () => {
        carrito.splice(index,1);
        cargarTabla();
        mostrarTotal();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    td.appendChild(btnEliminar);
    tr.appendChild(td);
    tabla.appendChild(tr);
    
}

function cargarTabla(){
    tabla.innerHTML = '';
    carrito.forEach((item, index) => {
        agregandoFilas(item, index);
    })

}

function mostrarTotal(){
    let total = carrito.reduce((acc, item) => acc + item.producto.precio*item.cantidad,0);
    totalCarrito.textContent = `El precio total a pagar es de ${total} pesos. Gracias por su compra!`
}


vaciarCarrito.onclick = () => {
    localStorage.removeItem('carrito');
    carrito = [];
    tabla.innerHTML = '';
    mostrarTotal();
}

botonAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const productoAgregado = menuHamburguesas[+listadoHamburguesas.value];
    let nuevaCompra = new Compra(productoAgregado,1);
    carrito.push(nuevaCompra);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarTabla();
    mostrarTotal();
});

