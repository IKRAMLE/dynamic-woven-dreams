<script>
    
    const basketToggle = document.getElementById('toggle'); 
    const basketClose = document.getElementById('basketclose'); 
    const basketSidebar = document.getElementById('basketsidebar'); 
    const basketItems = document.getElementById('items'); 
    const totalPriceElem = document.getElementById('total'); 
    const basketCount = document.getElementById('count'); 

    let basket = [];

    
    function updateBasketUI() {
        basketItems.innerHTML = '';
        let totalPrice = 0;
        basket.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            basketItems.innerHTML += `
                <li class="flex gap-4 items-center border-b pb-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md">
                    <div class="flex-1">
                        <h4 class="font-bold">${item.name}</h4>
                        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button class="decrease-qty bg-red-500 text-white px-2 py-1 rounded-md" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-qty bg-green-500 text-white px-2 py-1 rounded-md" data-index="${index}">+</button>
                        </div>
                    </div>
                </li>
            `;
        });
        totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;
        basketCount.textContent = basket.reduce((total, item) => total + item.quantity, 0);

        
        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                basket[index].quantity += 1;
                updateBasketUI();
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                if (basket[index].quantity > 1) {
                    basket[index].quantity -= 1;
                } else {
                    basket.splice(index, 1); 
                }
                updateBasketUI();
            });
        });
    }

    // Add items
    document.querySelectorAll('.add-to-basket').forEach(button => {
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

            updateBasketUI();
        });
    });

    // Show sidebar
    basketToggle.addEventListener('click', () => {
        basketSidebar.classList.remove('translate-x-full'); // Show sidebar
        basketSidebar.classList.add('translate-x-0'); // Move it into view
    });

    // Close sidebar
    basketClose.addEventListener('click', () => {
        basketSidebar.classList.add('translate-x-full'); 
        basketSidebar.classList.remove('translate-x-0'); 
    });
</script>