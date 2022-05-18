const alimentosPerro = [];

alimentosPerro.push(new Producto(1, "Alimento Ken L Adulto 22+3kg", 6700, "./imagenes/KenLAdulto.PNG"));
alimentosPerro.push(new Producto(2, "Alimento Ken L Cachorro 15+3kg", 5200, "../imagenes/KenLCachorro.PNG"));
alimentosPerro.push(new Producto(3, "Alimento Nutrique Adulto Raza Mediana", 410, "../imagenes/NutriqueAdulto.PNG"));
alimentosPerro.push(new Producto(4, "Alimento Pro Plan Adulto Raza Pequeña", 2800, "../imagenes/ProPlanAdulto.PNG"));
alimentosPerro.push(new Producto(5, "Alimento Royal Canin Mini Adulto", 1224, "../imagenes/ProPlanAdulto.PNG"));
alimentosPerro.push(new Producto(6, "Alimento Top Nutrition Adulto Raza Grande", 6520, "../imagenes/ProPlanAdulto.PNG"));

let carrito = [];

const divisa = "$";
let items = document.querySelector("#items");
let listaCarrito = document.querySelector("#listaCarritos");
let total = document.querySelector("#total");
let botonVaciar = document.querySelector("#botonVaciar");
let miLocalStorage = window.localStorage;
const claveLocalStorage = "compraCarrito";


/* DIBUJO PRODUCTOS */ 
function muestraProductos() {
    fetch('../data/productos.json')
    .then(response => response.json())
    .then(data =>{
        data.forEach((info) =>{
            /*estructura*/
            let estructura = document.createElement("div");
            estructura.classList.add("card");

            /*cuerpo*/
            let bodyCard = document.createElement("div");
            bodyCard.classList.add("card-body");

            /*titulo*/
            let titulo = document.createElement("h5");
            titulo.classList.add("card-title");
            titulo.textContent = info.nombre;

            /*imagen*/
            let foto = document.createElement("img");
            foto.classList.add("img-fluid", "fotos");
            foto.setAttribute("src", info.imagen);

            /*precio*/
            let moneda = document.createElement("p");
            moneda.classList.add("card-text");
            moneda.textContent = `${divisa}${info.precio}`;
            
            /*boton agregar producto al carrito*/
            let agregar = document.createElement("button");
            agregar.classList.add("btn", "btn-primary");
            agregar.textContent = "+";
            agregar.setAttribute("marcador", info.id)
            agregar.addEventListener('click', agregarProductoAlCarrito);

            /* insertar todo */
            bodyCard.appendChild(foto);
            bodyCard.appendChild(titulo);
            bodyCard.appendChild(moneda);
            bodyCard.appendChild(agregar);
            estructura.appendChild(bodyCard);
            items.appendChild(estructura);
        });
    });
}

function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"))
    renderizarCarrito();
    guardarCarritoEnLocalStorage()
    Swal.fire({
        title: '¡Producto añadido al carrito!',
        icon: 'success',
        width: '400px',
        timer: 1000,
        allowEscapeKey: true,
        confirmButtonColor: '#3085d6',
    });
}

function renderizarCarrito(){
    listaCarrito.textContent= "";

    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {

        const miItem = alimentosPerro.filter((itemAlimentosPerro)=>{
            return itemAlimentosPerro.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
                
        miNodo.appendChild(miBoton);
        listaCarrito.appendChild(miNodo);
    });
    total.textContent = calcularTotal();
} 

/*Evento para borrar un elemento del carrito*/
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;          
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
                
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

/* Calcula el precio total teniendo en cuenta los productos repetidos */
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = alimentosPerro.filter((itemAlimentosPerro) => {
            return itemAlimentosPerro.id === parseInt(item);
        });
    
        return total + miItem[0].precio;

    }, 0).toFixed(2);
}

/* Vacia el carrito y vuelve a dibujarlo */
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    localStorage.clear();

    Swal.fire({
        title: '¡Carrito vaciado!',
        icon: 'success',
        width: '400px',
        timer: 1000,
        allowEscapeKey: true,
        confirmButtonColor: '#3085d6',
    });
}

function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    if (miLocalStorage.getItem(claveLocalStorage) !== null) {
        carrito = JSON.parse(miLocalStorage.getItem(claveLocalStorage));
    }
}

/* Boton vaciar */ 
botonVaciar.addEventListener('click', vaciarCarrito);


cargarCarritoDeLocalStorage();
muestraProductos();
renderizarCarrito();
 