const basketToggle = document.getElementById('toggle');
const basketClose = document.getElementById('basketclose');
const basketSidebar = document.getElementById('basketsidebar');
const basketItems = document.getElementById('items');
const totalPriceElem = document.getElementById('total');
const basketCount = document.getElementById('count');

let basket = [];


const products = [
    { name: "Doll", price: 30, image: "crochet dolls.png" },
    { name: "Scarf", price: 25, image: "crochet scarf.png" },
    { name: "Hat", price: 20, image: "crochet hats.png" },
    { name: "Top", price: 35, image: "crochet top.png" },
    { name: "Skirt", price: 40, image: "crochet skirt.png" },
    { name: "Blanket", price: 50, image: "crochet blanket.png" },
    { name: "Dress", price: 60, image: "crochet dress.png" },
    { name: "Bag", price: 45, image: "crochet bags.png" },
];


function generateProductCards() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "bg-white border border-blue-400 rounded-lg shadow-md text-center p-6 hover:shadow-lg hover:-translate-y-1 transition";
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-[300px] object-cover rounded-md mb-4">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="text-black mb-4">Description not available.</p>
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


function addToBasket() {
    const addToBasketButtons = document.querySelectorAll('.add-to-basket');
    for (let i = 0; i < addToBasketButtons.length; i++) {
        addToBasketButtons[i].addEventListener('click', () => {
            const name = addToBasketButtons[i].dataset.name;
            const price = parseFloat(addToBasketButtons[i].dataset.price);
            const image = addToBasketButtons[i].dataset.image;

            const existingItem = basket.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                basket.push({ name, price, image, quantity: 1 });
            }

            updateBasketEl();
        });
    }
}


basketToggle.addEventListener('click', () => {
    basketSidebar.classList.remove('translate-x-full');
    basketSidebar.classList.add('translate-x-0');
});


basketClose.addEventListener('click', () => {
    basketSidebar.classList.add('translate-x-full');
    basketSidebar.classList.remove('translate-x-0');
});


document.addEventListener('DOMContentLoaded', () => {
    generateProductCards();
    addToBasket();
});
