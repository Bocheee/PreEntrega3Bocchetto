//CONTENEDOR DE LOS PRODUCTOS DONDE SE PUSHEAN
const containerProductos = document.querySelector("#productos");

//ARRAY DE LOS PRODUCTOS CON SUS OBJETOS
const contenedorProductosBurguers = document.querySelector('#contenedor-burguers');
const contenedorProductosBebidas = document.querySelector('#contenedor-bebidas');
const contenedorProductosFrito = document.querySelector('#contenedor-frito');

//carrito
const carritoProductos = document.querySelector("#contenedor-productos");
const carritoVacio = document.querySelector("#carrito-vacio");

//BTN de los carritos
const btnEnviarPedido = document.querySelector("#btn-enviar-pedido");


//ARRAY DONDE SE ALMACENAN LOS PRODUCTOS QUE VAMOS AÑADIENDO AL CARRITO
const carrito = JSON.parse(localStorage.getItem("carrito")) ||[];

//ARRAY DE LOS PRODUCTOS CON SUS OBJETOS
const burguers = [
    {
        id: "1",
        nombre: "American",
        descripcion: "Medallon 120gr (blend secreto), cheddar x4, bacon ahumado, alioli de berenjena ahumada, pepinillos.",
        precio: "$10900",
        imagen: "IMAGENES/american.png",
    },
    {
        id: "2",
        nombre: "Cheese Bacon",
        descripcion: "Medallon 120gr (blend secreto), cheddar x4, bacon ahumado",
        precio: "$10700",
        imagen:"IMAGENES/bacon-chese.jpg",
    },
    {
        id: "3",
        nombre: "Candy",
        descripcion: "Medallon 120gr (blend secreto), cheddar x4, bacon ahumado, cebolla caramelizada",
        precio: "$10700",
        imagen:"IMAGENES/candy.png",
    },
    {
        id: "4",
        nombre: "Crispy Onion",
        descripcion: "Medallon 120gr (blend secreto), cheddar x4, bacon ahumado, ali oli, mil islas, cebolla crispy, pepinillos (opcional)",
        precio: "$10900",
        imagen:"IMAGENES/crispy.png",
    }

];

const bebidas = [
    {
        id: "5",
        nombre: "Coca Cola",
        precio: "$1000",
        imagen:"IMAGENES/cocabotella.jpg",
    },
    {
        id: "6",
        nombre: "Agua",
        precio: "$900",
        imagen:"IMAGENES/agua.jpg",
    },
    {
        id: "7",
        nombre: "Schweppes pomelo",
        precio: "$1000",
        imagen:"IMAGENES/swet.jpg",
    },
    {
        id: "8",
        nombre: "Aquarius Pera",
        precio: "$1000",
        imagen:"IMAGENES/aquarius.webp",
    }
];

const frituras = [
    {
        id: "9",
        nombre: "Papas Fritas",
        descripcion: "",
        precio: "$2000",
        imagen:"IMAGENES/papaFritas.webp",
    },
    {
        id: "10",
        nombre: "Papas con Cheddar y Bacon",
        descripcion: "",
        precio: "$3500",
        imagen:"IMAGENES/papasFritas.png",
    },
    {
        id: "11",
        nombre: "Nuggets",
        descripcion: "",
        precio: "$5000",
        imagen:"IMAGENES/nuggets.jpg",
    },
    {
        id: "12",
        nombre: "Tequeños",
        descripcion: "",
        precio: "$5000",
        imagen:"IMAGENES/tequeños.webp",
    }
]

//HAMBURGUESAS
burguers.forEach((burguer) =>{
    let div = document.createElement("div");
    div.classList.add("burguers");
    div.innerHTML = `
    <div class="contenedor-producto">
        <img src="${burguer.imagen}" alt="">
        <div class="detalles-productos">
            <h4 class="nombre-producto">${burguer.nombre}</h4>
            <p class="descripcion-producto">${burguer.descripcion}</p>
            <p class="precio-producto">Simple: ${burguer.precio}</p>
            <button class="carrito-add"><i class='bx bx-cart-add'></i></button>
        </div>
    </div>
    `;

    let button = div.querySelector(".carrito-add");
    button.addEventListener("click", ()=>{
        agregarAlCarrito(burguer)
    });

    contenedorProductosBurguers.append(div);

})


//BEBIDAS
bebidas.forEach((bebida) =>{
    let div = document.createElement("div");
    div.classList.add("bebidas");
    div.innerHTML = `
    <div class="contenedor-producto">
        <img src="${bebida.imagen}" alt="">
        <div class="detalles-productos" ">
            <h4 class="nombre-producto">${bebida.nombre}</h4>
            <p class="precio-producto">${bebida.precio}</p>
            <button class="carrito-add"><i class='bx bx-cart-add'></i></button>
        </div>
    </div>
    `;

    let button = div.querySelector(".carrito-add");
    button.addEventListener("click", ()=>{
        agregarAlCarrito(bebida)
    });

    contenedorProductosBebidas.append(div);
})


//FRITURAS
frituras.forEach((frito) =>{
    let div = document.createElement("div");
    div.classList.add("frituras");
    div.innerHTML = `
    <div class="contenedor-producto">
        <img src="${frito.imagen}" alt="">
        <div class="detalles-productos" ">
            <h4 class="nombre-producto">${frito.nombre}</h4>
            <p class="precio-producto">${frito.precio}</p>
            <button class="carrito-add"><i class='bx bx-cart-add'></i></button>
        </div>
    </div>
    `;

    let button = div.querySelector(".carrito-add");
    button.addEventListener("click", ()=>{
        agregarAlCarrito(frito)
    });

    contenedorProductosFrito.append(div);
})




//AÑADE EL ELEMENTO AL CARRITO Y LUEGO ACTUALIZA LA VISTA DEL CARRITO PARA PODER VER EL PRODUCTO DENTRO DEL CARRITO
const agregarAlCarrito = (productos) =>{
    let productoEncarrito = carrito.find((item) => item.id === productos.id);

    if (productoEncarrito){
        productoEncarrito.cantidad++;
    }else{
        carrito.push({...productos, cantidad: 1});
    }

    estadoCarrito();

    
}

//FUNCION LA CUAL CONTROLA EL ESTADO DEL CARRITO, SI NO HAY ELEMENTOS DENTRO MUESTRA UN MENSAJE.
//EN CASO DE QUE HAYAN ELEMENTOS DENTRO, MUESTRA LOS PRODUCTOS.
function estadoCarrito(){
    if(carrito.length === 0){
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        btnEnviarPedido.classList.add("d-none");
    } else{
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        btnEnviarPedido.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((productos) =>{

            let div = document.createElement("div");
            div.classList.add("carrito-productos");
            div.innerHTML = `
            <div class="carrito-productos">       
                <img src="${productos.imagen}" alt="">
                <h4 class="nombre-producto">${productos.nombre}</h4>
                <p class="precio-producto">${productos.precio}</p>
                <p class="cantidad-producto">${productos.cantidad}</p>
                <button class="btn-remove"><i class='bx bx-x'></i></button>
            </div>
            `

            

            let btnRemove = div.querySelector(".btn-remove");
            btnRemove.addEventListener("click", () =>{
                eliminarElementoDelCarrito(productos);
            
            })
            carritoProductos.append(div);
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
estadoCarrito();


//LO QUE HACE ESTA FUNCION ES BUSCAR EL ELEMENTO EN EL CARRITO CON SU ID, LO BORRA Y LUEGO ACTUALIZA EL CARRITO
function eliminarElementoDelCarrito(productos){
    const indice = carrito.findIndex((item) => item.id === productos.id);
    carrito.splice(indice, 1);
    estadoCarrito();
    Swal.fire("Producto eliminado!");
}



/* BOTON PARA ABRIR Y CERRAR EL MENU DEL CARRITO */
document.addEventListener('DOMContentLoaded', function(){
    let btnCarrito = document.getElementById('btn-carrito');
    let btnClosed = document.getElementById('btn-closed');
    let menuToggle = document.getElementById('menu-carrito');
    

    btnCarrito.addEventListener('click', function(){
        menuToggle.classList.toggle('active');
    });

    btnClosed.addEventListener('click', function(){
        menuToggle.classList.toggle('active')
    });
});