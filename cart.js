emailjs.init("nrtzq7FwMIRzi6QMv");

function sendOrderEmail(cart) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const orderItems = cart
        .map(item => `${item.name} (${item.size}) x${item.quantity}`)
        .join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return emailjs.send("service_xnol9xp", "template_4mi2up3", {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        order_items: orderItems,
        order_total: total.toFixed(2)
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    const countEl = document.getElementById("cart-count");

    let total = 0;

    // Update cart count
    if (countEl) countEl.textContent = cart.length;

    if (!cart.length) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <strong>${item.name}</strong>
        <p>Size: ${item.size}</p>
        <p>Qty: ${item.quantity}</p>
        <p>€${item.price.toFixed(2)}</p>
        <button class="remove-btn" data-index="${index}">
          Remove
        </button>
      </div>
    `;

        container.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2);

    // Remove item
    container.addEventListener("click", e => {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    });

    // Submit order
    document.getElementById("order-form").addEventListener("submit", async e => {
        e.preventDefault();

        const messageEl = document.getElementById("order-message");
        messageEl.style.display = "none";
        messageEl.className = "order-message";

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            messageEl.textContent = "Your cart is empty. Please add a product before reserving.";
            messageEl.classList.add("error");
            messageEl.style.display = "block";
            return;
        }

        try {
            await sendOrderEmail(cart);

            localStorage.removeItem("cart");

            messageEl.textContent = "Thank you! Your pre-order has been reserved.";
            messageEl.classList.add("success");
            messageEl.style.display = "block";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

        } catch (error) {
            console.error(error);

            messageEl.textContent = "Failed to send order. Please try again.";
            messageEl.classList.add("error");
            messageEl.style.display = "block";
        }
    });


});
