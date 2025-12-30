/* =========================
   PRODUCTS CONFIG
========================= */
const products = {
    "hoodie-blue": {
        id: "hoodie-blue",
        name: "Da te sakam lesno e – Hoodie (Blue)",
        price: 32,
        type: "hoodie",
        images: ["images/hoodie-front.png", "images/hoodie-blue.png"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    "hoodie-pink": {
        id: "hoodie-pink",
        name: "Da te sakam lesno e – Hoodie (Pink)",
        price: 32,
        type: "hoodie",
        images: ["images/hoodie-front.png", "images/hoodie-pink.png"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    "tshirt-blue": {
        id: "tshirt-blue",
        name: "Da te sakam lesno e – T-Shirt (Blue)",
        price: 22,
        type: "tshirt",
        images: ["images/tshirt-front.png", "images/tshirt-blue.png"],
        sizes: ["S", "M", "L", "XL"]
    },
    "tshirt-pink": {
        id: "tshirt-pink",
        name: "Da te sakam lesno e – T-Shirt (Pink)",
        price: 22,
        type: "tshirt",
        images: ["images/tshirt-front.png", "images/tshirt-pink.png"],
        sizes: ["S", "M", "L", "XL"]
    }
};

/* =========================
   GET PRODUCT
========================= */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

if (!product) {
    alert("Product not found");
    throw new Error("Invalid product ID");
}

/* =========================
   ELEMENTS
========================= */
const imgEl = document.getElementById("product-image");
const titleEl = document.getElementById("product-title");
const priceEl = document.getElementById("product-price");
const sizeContainer = document.getElementById("sizes");
const chartImg = document.getElementById("size-chart");

const qtyEl = document.getElementById("qty");
const minusBtn = document.getElementById("qty-minus");
const plusBtn = document.getElementById("qty-plus");
const addToCartBtn = document.getElementById("add-to-cart");

/* =========================
   STATE
========================= */
let currentImageIndex = 0;
let selectedSize = null;
let quantity = 1;

/* =========================
   INITIAL RENDER
========================= */
imgEl.src = product.images[0];
titleEl.textContent = product.name;
priceEl.textContent = `€${product.price.toFixed(2)}`;

chartImg.src =
    product.type === "hoodie"
        ? "images/hoodie-chart.png"
        : "images/tshirt-chart.png";

/* =========================
   SIZES
========================= */
sizeContainer.innerHTML = "";
product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.textContent = size;
    btn.onclick = () => {
        document.querySelectorAll("#sizes button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = size;
    };
    sizeContainer.appendChild(btn);
});

/* =========================
   QUANTITY
========================= */
qtyEl.textContent = quantity;

plusBtn.onclick = () => {
    quantity++;
    qtyEl.textContent = quantity;
};

minusBtn.onclick = () => {
    if (quantity > 1) {
        quantity--;
        qtyEl.textContent = quantity;
    }
};

/* =========================
   IMAGE NAV
========================= */
document.getElementById("prev").onclick = () => {
    currentImageIndex =
        (currentImageIndex - 1 + product.images.length) % product.images.length;
    imgEl.src = product.images[currentImageIndex];
};

document.getElementById("next").onclick = () => {
    currentImageIndex =
        (currentImageIndex + 1) % product.images.length;
    imgEl.src = product.images[currentImageIndex];
};

/* =========================
   ADD TO CART
========================= */
addToCartBtn.onclick = () => {
    if (!selectedSize) {
        showMessage("Please select a size.", "error");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
        id: product.id,
        name: product.name,        // IMPORTANT: use `name`, not `title`
        price: product.price,
        size: selectedSize,
        quantity: quantity,        // IMPORTANT: use `quantity`, not `qty`
        image: product.images[0]
    };

    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    quantity = 1;
    qtyEl.textContent = "1";
    selectedSize = null;

    document.querySelectorAll("#sizes button").forEach(btn =>
        btn.classList.remove("active")
    );

    showMessage("Item added to cart ✓", "success");

};

function showMessage(text, type) {
  const msg = document.getElementById("add-to-cart-message");
  msg.textContent = text;
  msg.className = `add-to-cart-message ${type}`;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "add-to-cart-message";
  }, 2500);
}

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.length;
}

updateCartCount();
