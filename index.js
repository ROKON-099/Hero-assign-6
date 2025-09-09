//api fetch from ph-hero api //
    //https://openapi.programming-hero.com/api/plants api//

    const PLANTS_API_URL = 'https://openapi.programming-hero.com/api/plants';

    const container = document.getElementById('plants-container');
    let allPlants = [];

  async function fetchPlants() {

   displaySpinner();
   try {

   const response = await fetch(PLANTS_API_URL);

   const responsedata = await response.json();

  allPlants = responsedata.plants || responsedata;
   loadPlants(allPlants);  }  // page load korle sobgulo plants dekhabe
   catch (error) {

       console.error('Failed to retrieve plants:', err);

    container.innerHTML = `<p class="text-red-500">unable to load plants.</p>`; } 
   finally {

    hiddenSpinner(); }
    
  }

           // initialize and display spinner //

   const spinner = document.createElement('div'); //generate a new div for spinner
   spinner.className = 'fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 not-visible';
   spinner.innerHTML = `<div class="loader border-4
    border-t-gray-500 border-gray-200 rounded-full w-10 h-10 animate-spin"></div>`;

        document.body.appendChild(spinner);

        function displaySpinner() 
        { spinner.classList.remove('invisible'); }

         function hiddenSpinner() 
         { spinner.classList.add('invisible'); }

                // load and show spnier//

   const categoryButtons = document.querySelectorAll('[data-category]');

  categoryButtons.forEach(btn => {
  btn.addEventListener('click', function() {
   const category = btn.getAttribute('data-category');

          filterPlantsByCategory(category);

             setActiveButton(btn);
  });

});



    //set a_______________________Active Buttoon______________________________________//

     function setActiveButton(button) {
  categoryButtons.forEach(btn => {

      btn.classList.remove('bg-green-600', 'text-white');
  btn.classList.add('hover:bg-[#15803d]', 'hover:text-white');

  });

     button.classList.add('bg-green-600', 'text-white');
  button.classList.remove('hover:bg-green-700', 'hover:text-white'); }


    

             //  Filter Plants by catagory //


 function filterPlantsByCategory(category) {
     displaySpinner();
   
  setTimeout(() => {
    if (category === 'All trees') {
      loadPlants(allPlants);
    } else {
      const filtered = allPlants.filter(p => p.category === category);
      loadPlants(filtered);
    }
    hiddenSpinner();
  }, 300);
}
    document.querySelectorAll('.catergory-btn').
   forEach(btn => {btn.addEventListener('click',() => {
  const category =btn.getAttribute('data-catergory');
       filterCategory(category);

   });
  });
      fetchPlants();

   // __________________________Load Plant Cardds_______________________________________//

    function loadPlants(plants) {
      container.innerHTML = '';

     if (!plants || plants.length === 0) {
        container.innerHTML = `<p class="text-gray-500">No plants found.</p>`;
        return;
    }

    plants.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow p-4 hover:shadow-lg flex flex-col";

        card.innerHTML = `
            <!-- Image -->
            <img src="${p.image}" alt="${p.name}" 
                 class="w-full h-40 object-cover rounded-lg mb-3">

            <!-- Name -->
            <h2 class="text-lg font-bold text-gray-800 cursor-pointer truncate hover:underline mb-1">
              ${p.name}
            </h2>

            <!-- Description -->
            <p class="text-xs text-gray-500 mb-3 line-clamp-3">
              ${p.description || 'No description available'}
            </p>

            <!-- Category + Price -->
            <div class="flex items-center justify-between mb-3">
              <!-- Category Badge -->
              <span class="text-sm text-[#1aba54] w-auto py-1 rounded-lg text-center truncate  bg-[#dcfce7]">
                ${p.category}
              </span>
              <!-- Price -->
              <span class="text-black font-semibold">
                ৳${p.price}
              </span>
            </div>

            <!-- Button -->
            <button class="bg-[#15803d] text-white w-full py-1 rounded-xl hover:bg-gray-300 transition">
              Add To Cart
            </button>
        `;

        // Add event listeners for each card
        card.querySelector('button').addEventListener('click', () => addToCart(p));
        card.querySelector('h2').addEventListener('click', () => openModal(p));

        container.appendChild(card);
    });
}
   






//_____________________cart option __________________________//


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
              renderCart();}
                      

// ____________________________ Modal________________________________//

      function openModal(plant) {
     let modal = document.getElementById('plant-modal');
    if (!modal) {
    modal = document.createElement('div');

    modal.id = 'plant-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onclick="closeModal()" class="absolute top-2 right-2
         text-red-500 text-lg ">❌</button>
        <div id="modal-content"></div>
      </div>`;
    document.body.appendChild(modal);
                                      }
        const modalContent = modal.querySelector('#modal-content');

  modalContent.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover rounded-lg mb-3">
    <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
     <p class="text-gray-600 mb-2">
      <strong>Category:
      </strong> ${plant.category}</p>
    <p class="text-gray-600 mb-2">
     <strong>Price:</strong> ৳${plant.price}</p>
     <p class="text-gray-500 mb-2">${plant.description || 'No description available'}</p> `;
  modal.classList.remove('hidden');
             }



function closeModal() {
  const modal = document.getElementById('plant-modal');
  if (modal) modal.classList.add('hidden');
            }

//_______________________________ load _______________________________________//
   window.addEventListener('DOMContentLoaded', () => {
     fetchPlants();


  const defaultBtn = document.querySelector('[data-category="All trees"]');
  
  if (defaultBtn) setActiveButton(defaultBtn); });
                                               

//__________________________end__________________________________________//
//___________________________end____________________________________________//



