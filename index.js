// ================= Spinner =================
const spinner = document.createElement('div');
spinner.className = 'fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 hidden';
spinner.innerHTML = `<div class="loader border-4 border-t-green-500 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>`;
document.body.appendChild(spinner);
function showSpinner() { spinner.classList.remove('hidden'); }
function hideSpinner() { spinner.classList.add('hidden'); }

// ================= Plants API =================
const PLANTS_API_URL = 'https://openapi.programming-hero.com/api/plants';
const container = document.getElementById('plants-container');
let allPlants = [];

async function fetchPlants() {
  showSpinner();
  try {
    const res = await fetch(PLANTS_API_URL);
    const data = await res.json();
    allPlants = data.plants || data;
    loadPlants(allPlants); // page load এ সব plant দেখাবে
  } catch (err) {
    console.error('Error fetching plants:', err);
    container.innerHTML = `<p class="text-red-500">Failed to load plants.</p>`;
  } finally {
    hideSpinner();
  }
}

// ================= Categories =================
const categoryButtons = document.querySelectorAll('[data-category]');

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    filterPlantsByCategory(category);
    setActiveButton(btn);
  });
});

// ================= Active Button =================
function setActiveButton(button) {
  categoryButtons.forEach(btn => {
    btn.classList.remove('bg-green-600', 'text-white');
    btn.classList.add('hover:bg-green-700', 'hover:text-white');
  });
  button.classList.add('bg-green-600', 'text-white');
  button.classList.remove('hover:bg-green-700', 'hover:text-white');
}

// ================= Filter Plants =================
function filterPlantsByCategory(category) {
  if (category === 'All trees') {
    loadPlants(allPlants);
  } else {
    const filtered = allPlants.filter(p => p.category === category);
    loadPlants(filtered);
  }
}

// ================= Load Plant Cards =================
function loadPlants(plants) {
  container.innerHTML = '';
  if (!plants || plants.length === 0) {
    container.innerHTML = `<p class="text-gray-500">No plants found.</p>`;
    return;
  }

  plants.forEach(p => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-lg shadow p-4 hover:shadow-lg flex flex-col";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover rounded-lg mb-3">
      <h2 class="text-lg font-bold text-green-700 cursor-pointer hover:underline">${p.name}</h2>
      <p class="text-xs text-gray-500 mb-2">${p.description || 'No description'}</p>
      <p class="text-sm font-bold text-gray-600 mb-2">${p.category}</p>
      <p class="text-blue-600 font-semibold mb-3">৳${p.price}</p>
      <button class="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 mt-auto">Add to Cart</button>
    `;

    card.querySelector('button').addEventListener('click', () => addToCart(p));
    card.querySelector('h2').addEventListener('click', () => openModal(p));
    container.appendChild(card);
  });
}

// ================= Cart =================
const cartItemsList = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
let cart = [];

function addToCart(plant) {
  cart.push(plant);
  renderCart();
}
function renderCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;

    const li = document.createElement('li');
    li.className = 'flex items-center rounded-sm  justify-between p-2 border-b bg-[#f0fdf4] border-gray-200'; // Flex + border

    li.innerHTML = `
      <!-- Name এবং Price বাম দিকে -->
      <div  >
        <div class="font-semibold">${item.name}</div>
        <div class="text-gray-500 text-sm">৳${item.price}</div>
      </div>

      <!-- Remove button ডান দিকে -->
      <button class="text-red-500 ml-4" onclick="removeFromCart('${item.name}')">❌</button>
    `;

    cartItemsList.appendChild(li);
  });

  cartTotalEl.textContent = `Total: ৳${total}`;
}




function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

// ================= Modal =================
function openModal(plant) {
  let modal = document.getElementById('plant-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'plant-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onclick="closeModal()" class="absolute top-2 right-2 text-red-500 text-lg font-bold">✖</button>
        <div id="modal-content"></div>
      </div>`;
    document.body.appendChild(modal);
  }

  const modalContent = modal.querySelector('#modal-content');
  modalContent.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover rounded-lg mb-3">
    <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
    <p class="text-gray-600 mb-2"><strong>Category:</strong> ${plant.category}</p>
    <p class="text-gray-600 mb-2"><strong>Price:</strong> ৳${plant.price}</p>
    <p class="text-gray-500 mb-2">${plant.description || 'No description available'}</p>
  `;
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('plant-modal');
  if (modal) modal.classList.add('hidden');
}

// ================= Initial Load =================
window.addEventListener('DOMContentLoaded', () => {
  fetchPlants();

  // Set default active "All Trees"
  const defaultBtn = document.querySelector('[data-category="All trees"]');
  if (defaultBtn) setActiveButton(defaultBtn);
});





