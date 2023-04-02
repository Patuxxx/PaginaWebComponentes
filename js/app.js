// variable que mantiene el estado visible del carrito
var carritoVisible = false;

// que todos los elementos de la pagina carguen para continuar
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    // agregar funcionalidad a los btn eliminar del carro
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i <botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',elimianrItemCarrito);
    }
    // agrego funcionalidad al boton sumar
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // agrego funcionalidad al boton restar
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // funciones a los botones agregar al carro
    var botonesAgregarAlcarrito = document.getElementsByClassName('boton-producto');
    for(var i=0; i<botonesAgregarAlcarrito.length;i++){
        var button = botonesAgregarAlcarrito[i];
        button.addEventListener('click',agregarAlcarritoClicked);
    }

    // agregar funcion para boton comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);
}

// eliminar item seleccionado del carro
function elimianrItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    // actualizar total del carro despues de eliminar
    actualizarTotalCarrito();

    // siguiente function, controla si hay elementos en el carrito una vez eliminado
    ocultarCarrito();
}

// actualizar el total del carro
function actualizarTotalCarrito(){
    // seleccionamos el contenedor del carrito
    var carritoContenedor=document.getElementsByClassName('carrito')[0];
    var carritoItems=carritoContenedor.getElementsByClassName('carrito-pro');
    var total = 0;

    // recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioELemento = item.getElementsByClassName('carrito-producto-precio')[0];
        console.log(precioELemento);
        // para quitar el simbolo peso mas el punto
        var precio = parseFloat(precioELemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-producto-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es")+',00';

}
// saca el carrito de la web si no hay nada seleccionado
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-producto')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible= false;

        // maximizar el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-productos')[0];
        items.style.width = '100%';
    }    
}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-producto-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-producto-cantidad')[0].value=cantidadActual;
    // actualizar el total
    actualizarTotalCarrito();
}


function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-producto-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //controlar para que no sea menor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-producto-cantidad')[0].value=cantidadActual;
        // actualizar el total
        actualizarTotalCarrito();
    }

}

function agregarAlcarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-producto')[0].innerText;
    console.log(titulo);
    var precio= item.getElementsByClassName('precio-producto')[0].innerText;
    var imagenSrc = item.getElementsByClassName('imag-producto')[0].src;
    console.log(imagenSrc);

    // funcion para agregar elemento al carrito, por parametros
    agregarItemAlCarrito(titulo,precio,imagenSrc);
}

function agregarItemAlCarrito(titulo,precio,imagenSrc){
    var item= document.createElement('div');
    item.classList.add= 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-producto')[0];

    // control para el producto ingresado no se encuentra ya ingresado
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-pro-titulo');
    for(var i=0; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("el producto ya esta en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-pro">
        <img src="${imagenSrc}" alt="" width="70px"></a>
        <div class="carrito-pro-detalles">
            <span class="carrito-pro-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="icon icon-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-producto-cantidad" disabled>
                <i class="icon icon-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-producto-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="icon icon-bin2"></i>
        </span>  
    </div>
    `
    item.innerHTML= itemCarritoContenido;
    itemsCarrito.append(item);

    // agregamos funcion de eliminar a los nuevos productos
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',elimianrItemCarrito);

    // funcion de sumar
    var botonSumarCantidad= item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    // funcion de restar
    var botoneRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botoneRestarCantidad.addEventListener('click',restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por Comprar nuestros productos");
}