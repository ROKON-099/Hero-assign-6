// Script.js
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let total = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    // Create a div for each cart item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("mb-2", "p-2", "bg-[#f0fdf4]", "rounded", "shadow-sm");

    // Add tree name
    const itemName = document.createElement("p");
    itemName.textContent = name;
    itemName.classList.add("font-semibold");

    // Add price × quantity under name
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `৳${price} × 1`;
    itemPrice.classList.add("text-green-700", "text-sm");

    // Append name and price to div
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);

    // Append div to cart
    cartItems.appendChild(itemDiv);

    // Update total
    total += price;
    cartTotal.textContent = `Total: ৳${total}`;
  });
});
