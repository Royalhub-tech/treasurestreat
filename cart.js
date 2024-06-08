document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalContainer = document.getElementById("total");
    const clearCartButton = document.getElementById("clear-cart");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    clearCartButton.addEventListener("click", () => {
        cart.length = 0;
        updateCart();
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector(".quantity-input").addEventListener("input", (e) => {
                item.quantity = parseInt(e.target.value);
                if (item.quantity <= 0) {
                    cart.splice(cart.indexOf(item), 1);
                }
                updateCart();
            });

            cartItem.querySelector(".remove-item").addEventListener("click", () => {
                cart.splice(cart.indexOf(item), 1);
                updateCart();
            });
        });

        totalContainer.textContent = total.toFixed(2);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const totalPriceElement = document.getElementById('total-price');

    products.forEach(product => {
        const decreaseButton = product.querySelector('.decrease');
        const increaseButton = product.querySelector('.increase');
        const quantityInput = product.querySelector('.quantity');
        const priceElement = product.querySelector('.price');
        
        const price = parseFloat(priceElement.textContent.replace('$', ''));

        decreaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                quantity--;
                quantityInput.value = quantity;
                updateTotalPrice();
            }
        });

        increaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotalPrice();
        });

        quantityInput.addEventListener('input', () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 0) {
                quantityInput.value = 0;
            }
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        let total = 0;
        products.forEach(product => {
            const quantity = parseInt(product.querySelector('.quantity').value);
            const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
            total += quantity * price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalContainer = document.getElementById("total");
    const clearCartButton = document.getElementById("clear-cart");

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector(".quantity-input").addEventListener("input", (e) => {
                item.quantity = parseInt(e.target.value);
                if (item.quantity <= 0) {
                    cart.splice(cart.indexOf(item), 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });

            cartItem.querySelector(".remove-item").addEventListener("click", () => {
                cart.splice(cart.indexOf(item), 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });

        totalContainer.textContent = total.toFixed(2);
    }

    clearCartButton.addEventListener("click", () => {
        cart.length = 0;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    });

    updateCart();
});
