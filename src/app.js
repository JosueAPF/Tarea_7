//esto debe ir en otro archivo .js
import { products } from "./Productos.js";

let CantidadProducto;

function renderProducts(filterCategory = "todos") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiar la lista de productos

    const filteredProducts = products.filter(product => {
        return filterCategory === "todos" || product.category === filterCategory;
    });

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
            <label>Cantidad :<input type="input" name="Cantidad" id="Cantidad-${i}"></label>
        `;
        //solucion al imput(cantidad) de la plantilla literal / ya que no se obtenenia
        const inputCantidad = document.getElementById(`Cantidad-${i}`);
        //---settimeout espera ala plantilla iterable  >:'(
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
        productDiv.onclick = () => showDetails(products.findIndex(p => p.title === product.title)); // Al hacer clic, mostrar detalles
        productList.appendChild(productDiv);
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

document.getElementById("close-details").onclick = function () {
    document.getElementById("product-details").classList.add("hidden");
};

// Función para calcular el total de precios de productos seleccionados
document.getElementById("calculate-button").onclick = function () {
    const checkboxes = document.querySelectorAll(".product-checkbox");
    let total = 0;
    //const quantity = parseInt(document.getElementById("quantity").value) || 1; // Obtener cantidad

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price) * CantidadProducto; // Multiplicar por la cantidad
        }
    });

    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
    if (selectedPaymentMethod) {
        alert(`Método de pago seleccionado: ${selectedPaymentMethod.value}`);
    } else {
        alert("No se ha seleccionado ningún método de pago.");
    }

    document.getElementById("total-price").innerText = `Total: $${total}`;
};

// Renderizar productos al cargar la página
renderProducts();
