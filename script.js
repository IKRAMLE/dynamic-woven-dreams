const basketToggle = document.getElementById('toggle');
const basketClose = document.getElementById('basketclose');
const basketSidebar = document.getElementById('basketsidebar');
const basketItems = document.getElementById('items');
const totalPriceElem = document.getElementById('total');
const basketCount = document.getElementById('count');
const favoritesToggle = document.getElementById('favorite-toggle');
const favoritesClose = document.getElementById('favorites-close');
const favoritesSidebar = document.getElementById('favorites-sidebar');
const favoritesItems = document.getElementById('favorite-items');
const favoritesCount = document.getElementById('favorite-count');

let basket = [];
let favorites = [];

const products = [
    { name: "Doll", price: 30, image: "crochet dolls.png", description: "Handcrafted crochet doll, perfect for kids." },
    { name: "Scarf", price: 25, image: "crochet scarf.png", description: "Warm and stylish crochet scarf for chilly days." },
    { name: "Hat", price: 20, image: "crochet hats.png", description: "Cozy crochet hat to keep you warm in winter." },
    { name: "Top", price: 35, image: "crochet top.png", description: "Elegant crochet top for casual and semi-formal occasions." },
    { name: "Skirt", price: 40, image: "crochet skirt.png", description: "Chic crochet skirt, perfect for summer outings." },
    { name: "Blanket", price: 50, image: "crochet blanket.png", description: "Soft and cozy crochet blanket for your home." },
    { name: "Dress", price: 60, image: "crochet dress.png", description: "Beautiful crochet dress, perfect for any occasion." },
    { name: "Bag", price: 45, image: "crochet bags.png", description: "Stylish crochet bag for your everyday needs." },
];

function generateCards() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "bg-white border border-blue-400 rounded-lg shadow-md text-center p-6 hover:shadow-lg hover:-translate-y-1 transition relative";
        
        const isFavorite = favorites.some(fav => fav.name === product.name);
        
        productCard.innerHTML = `
            <button class="favorite-btn absolute top-1 right-1 z-10" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 ${isFavorite ? 'text-green-500' : 'text-gray-400'}">
                    <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
            </button>
            <img src="${product.image}" alt="${product.name}" class="w-full h-[300px] object-cover rounded-md mb-4">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="text-black mb-4">${product.description}</p>
            <p class="text-lg font-bold mb-2">$${product.price}</p>
            <button 
                class="add-to-basket bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-black transition"
                data-name="${product.name}" 
                data-price="${product.price}" 
                data-image="${product.image}"
            >Shop Now</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

function updateFavoritesEl() {
    favoritesItems.innerHTML = '';
    favoritesCount.textContent = favorites.length;

    favorites.forEach((item, index) => {
        favoritesItems.innerHTML += `
            <li class="flex gap-4 items-center border-b pb-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md">
                <div class="flex-1">
                    <h4 class="font-bold">${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <button class="remove-favorite bg-red-600 text-white px-2 py-1 rounded-md mt-2" data-index="${index}">Remove</button>
                </div>
            </li>
        `;
    });

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-favorite');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            favorites.splice(index, 1);
            updateFavoritesEl();
            // Refresh product cards to update favorite icons
            const productsContainer = document.getElementById('products-container');
            productsContainer.innerHTML = '';
            generateCards();
            addEventListeners();
        });
    });
}

function updateBasketEl() {
    basketItems.innerHTML = ''; 
    let totalPrice = 0;

    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        totalPrice += item.price * item.quantity;

        basketItems.innerHTML += `
            <li class="flex gap-4 items-center border-b pb-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md">
                <div class="flex-1">
                    <h4 class="font-bold">${item.name}</h4>
                    <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="decrease-qty bg-red-500 text-white px-2 py-1 rounded-md" data-index="${i}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty bg-green-500 text-white px-2 py-1 rounded-md" data-index="${i}">+</button>
                    </div>
                </div>
            </li>
        `;
    }

    totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;
    basketCount.textContent = basket.reduce((total, item) => total + item.quantity, 0);

    const increaseBtns = document.querySelectorAll('.increase-qty');
    const decreaseBtns = document.querySelectorAll('.decrease-qty');

    for (let i = 0; i < increaseBtns.length; i++) {
        increaseBtns[i].addEventListener('click', () => {
            basket[i].quantity += 1;
            updateBasketEl();
        });
    }

    for (let i = 0; i < decreaseBtns.length; i++) {
        decreaseBtns[i].addEventListener('click', () => {
            if (basket[i].quantity > 1) {
                basket[i].quantity -= 1;
            } else {
                basket.splice(i, 1);
            }
            updateBasketEl();
        });
    }
}

function addEventListeners() {
    // Add to basket functionality
    const addToBasketButtons = document.querySelectorAll('.add-to-basket');
    addToBasketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            const existingItem = basket.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                basket.push({ name, price, image, quantity: 1 });
            }

            updateBasketEl();
        });
    });

    // Favorite functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            const existingFavorite = favorites.findIndex(fav => fav.name === name);
            if (existingFavorite === -1) {
                favorites.push({ name, price, image });
                button.querySelector('svg').classList.remove('text-gray-400');
                button.querySelector('svg').classList.add('text-blue-300');
            } else {
                favorites.splice(existingFavorite, 1);
                button.querySelector('svg').classList.remove('text-blue-300');
                button.querySelector('svg').classList.add('text-gray-400');
            }

            updateFavoritesEl();
        });
    });
}

// Basket sidebar toggle
basketToggle.addEventListener('click', () => {
    basketSidebar.classList.remove('translate-x-full');
    basketSidebar.classList.add('translate-x-0');
    favoritesSidebar.classList.add('translate-x-full');
    favoritesSidebar.classList.remove('translate-x-0');
});

basketClose.addEventListener('click', () => {
    basketSidebar.classList.add('translate-x-full');
    basketSidebar.classList.remove('translate-x-0');
});

// Favorites sidebar toggle
favoritesToggle.addEventListener('click', () => {
    favoritesSidebar.classList.remove('translate-x-full');
    favoritesSidebar.classList.add('translate-x-0');
    basketSidebar.classList.add('translate-x-full');
    basketSidebar.classList.remove('translate-x-0');
});

favoritesClose.addEventListener('click', () => {
    favoritesSidebar.classList.add('translate-x-full');
    favoritesSidebar.classList.remove('translate-x-0');
});

document.addEventListener('DOMContentLoaded', () => {
    generateCards();
    addEventListeners();
    updateFavoritesEl();
});