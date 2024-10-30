//esto debe ir en otro archivo .js
const products = [
    {
        title: "Camiseta",
        description: "Camiseta de algodón.",
        image: "https://via.placeholder.com/150",
        price: 20,
        category: "ropa"
    },
    {
        title: "Laptop",
        description: "Laptop para oficina y estudio.",
        image: "https://via.placeholder.com/150",
        price: 800,
        category: "electrodomesticos"
    },
    {
        title: "Consola de Videojuegos",
        description: "Consola de videojuegos de última generación.",
        image: "https://via.placeholder.com/150",
        price: 500,
        category: "gaming"
    },
    {
        title: "Escritorio",
        description: "Escritorio para oficina.",
        image: "https://via.placeholder.com/150",
        price: 150,
        category: "oficina"
    },
    {
        title: "Olla a Presión",
        description: "Olla a presión de acero inoxidable.",
        image: "https://via.placeholder.com/150",
        price: 60,
        category: "cocina"
    }
];

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
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>Precio: Q${product.price}</p>
            <input type="checkbox" class="product-checkbox" data-price="${product.price}" data-index="${i}">
        `;
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
    const quantity = parseInt(document.getElementById("quantity").value) || 1; // Obtener cantidad

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price) * quantity; // Multiplicar por la cantidad
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
