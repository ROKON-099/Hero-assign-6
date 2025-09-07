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

function openModal(title, description, imgSrc, price) {
  const modal = document.getElementById('treeModal');
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDescription').innerText = description;
  document.getElementById('modalImg').src = imgSrc;
  document.getElementById('modalPrice').innerText = price;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Close modal button
document.getElementById('closeModalBtn').addEventListener('click', function() {
  const modal = document.getElementById('treeModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
});

// Close modal on clicking outside modal content
document.getElementById('treeModal').addEventListener('click', function(e) {
  if(e.target === this){
    this.classList.add('hidden');
    this.classList.remove('flex');
  }
});

// Add click listener to all <h3> elements inside cards
document.querySelectorAll('.tree-card, .card h3').forEach(h3 => {
  h3.addEventListener('click', function() {
    // Get modal data from dataset attributes
    const title = this.dataset.title;
    const description = this.dataset.description;
    const imgSrc = this.dataset.img;
    const price = this.dataset.price;

    openModal(title, description, imgSrc, price);
  });
});

});
