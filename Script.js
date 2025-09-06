// Script.js
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let total = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    // Add item to cart
    const li = document.createElement("li");
    li.textContent = `${name}: ৳${price} × 1`;
    cartItems.appendChild(li);

    // Update total
    total += price;
    cartTotal.textContent = `Total: ৳${total}`;
  });
});
