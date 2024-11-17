// 1. Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// 2. ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate total price for the item (product * quantity)
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// 3. ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];  // Array to hold cart items
    }

    // Add item to cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;  // Update quantity if product is already in cart
        } else {
            const cartItem = new ShoppingCartItem(product, quantity);
            this.items.push(cartItem);  // Add new item to cart
        }
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Get total price of items in the cart
    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Display cart items and total price on the web page
    displayCart() {
        // Get the cart container element
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = '';  // Clear any previous content

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            itemElement.innerHTML = `
                <p>Product: ${item.product.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total Price: $${item.getTotalPrice()}</p>
                <button class="remove-item" data-id="${item.product.id}">Remove</button>
            `;

            // Add remove button functionality
            const removeButton = itemElement.querySelector('.remove-item');
            removeButton.addEventListener('click', () => {
                this.removeItem(item.product.id);
                this.displayCart();  // Update the display after removal
            });

            cartContainer.appendChild(itemElement);  // Append the item element to the container
        });

        // Display the total price
        const totalElement = document.createElement('p');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `Total Cart Price: $${this.getTotal()}`;
        cartContainer.appendChild(totalElement);
    }
}

// Test the ability of the objects
const product1 = new Product(1, 'Pearl Necklace', 400);
const product2 = new Product(2, 'Diamond Ring', 500);

const cart = new ShoppingCart();
cart.addItem(product1, 2);  // Add 2 Pearl Necklaces
cart.addItem(product2, 1);  // Add 1 Diamond Ring

// Display cart items on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.displayCart();
});
