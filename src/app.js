//esto debe ir en otro archivo .js
import { products } from "./Productos.js";


/*      variables globales*/
let CantidadProducto;
let DescuentoAplicado;
let TotalApagar;
let Des;
let total = 0;

/****>>>>>>>>>>>>>>>insercion de los datos en el div vacio ->forma dinamica*****/
function renderProducts(filterCategory = "todos") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiar la lista de productos


    //fitrado de el diccionario
    const filteredProducts = products.filter(product => {
        return filterCategory === "todos" || product.category === filterCategory;
    });

    //iterando cada elemento filtrado de el diccionario
    for (let i = 0; i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        //usando literales de plantilla para la insercion del DOM
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>Precio: Q${product.price}</p>
            <input type="checkbox" class="product-checkbox" data-price="${product.price}" data-index="${i}">
            <br>
            <label>Cantidad <input type="input" name="Cantidad" id="Cantidad-${i}"></label>
            <button class="MostrarDetalles" data-index="${i}">Ver Detalles</button>
        `;
        //agregar la plantilla literal a el div=productList
        productList.appendChild(productDiv);
        //solucion al imput(cantidad) de la plantilla literal / ya que no se obtenenia
       
       
        const inputCantidad = document.getElementById(`Cantidad-${i}`);
        //---settimeout espera ala plantilla iterable 
        setTimeout(() => {
            const inputCantidad = document.getElementById(`Cantidad-${i}`);
            if (inputCantidad) {
                inputCantidad.addEventListener('input', function() {
                    console.log(inputCantidad.value);
                    product.cantidad = inputCantidad.value;
                    CantidadProducto = product.cantidad
                    console.log( CantidadProducto)
                });
            } else {
                console.error("El elemento input no se encontró en el DOM.");
            }
        }, 0);
       
        const detailsButton = productDiv.querySelector('.MostrarDetalles');
        detailsButton.addEventListener('click', () => {
            showDetails(products.findIndex(p => p.title === product.title));
        });
    }
}

// Evento para filtrar productos cuando cambia la categoría seleccionada
document.getElementById("category-select").onchange = function () {
    const selectedCategory = this.value;
    renderProducts(selectedCategory);
};

//titulo d cada item y descripcion del parrafo
function showDetails(index) {
    const product = products[index];
    document.getElementById("detail-title").innerText = product.title;
    document.getElementById("detail-image").src = product.image;
    document.getElementById("detail-description").innerText = product.description;
    document.getElementById("product-details").classList.remove("hidden");
}
//evento de cerrado del modal
document.getElementById("close-details").onclick = function () {
    document.getElementById("product-details").classList.add("hidden");
};

// Función para calcular el total de precios de productos seleccionados
document.getElementById("calculate-button").onclick = function () {
    const checkboxes = document.querySelectorAll(".product-checkbox");
    total = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price) * CantidadProducto; // Multiplicar por la cantidad
        }
    });
    //Si encuentras un radio button seleccionado con ese nombre="Descuento", lo almacena en la variable :selectedPaymentMethod
    const selectedPaymentMethod = document.querySelector('input[name="Descuento"]:checked');
    if (selectedPaymentMethod) {
        DescuentoAplicado = selectedPaymentMethod.value;

        //fórmula de descuento porcentual :)
        TotalApagar = total * (1-DescuentoAplicado);
        //-----------------------------------------
        console.log("sin Descuento :",total)
        console.log("Decuento a productos :",DescuentoAplicado)
        console.log("Total a Pagar es: ",TotalApagar)
    } else {
        //alert("No se ha seleccionado ningún método de pago.");
        console.log("Seleccione algun radioButton")
    }
    document.getElementById("Total-noDescuento").innerHTML = `Sub-Total: Q${total}`;
    document.getElementById("total-price").innerText = `Total Final: Q${TotalApagar}`;
};


//funcion de limpiesa de componentes de la pagina
const LimpiarButton = document.getElementById('Limpiar-button');
    LimpiarButton.addEventListener('click', function() {
        location.reload(); // Recargar toda la página
    });

// Renderizar productos al cargar la página
renderProducts();



/************Boton para la pagina 2****************** */
const EnlacePag2 = document.getElementById("Info_label");
EnlacePag2.addEventListener('click', function() {
    window.location.href = 'QuinesSomos.html';
   
});