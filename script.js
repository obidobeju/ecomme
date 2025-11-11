// script.js
// --- Basic product data (20 Gadget Products) ---
const PEXELS_API_KEY = "zUF72zjQkflYRc4zMfEsUEQqyGPTpVRtSM6wjhmqsl4rxsfPcdJHf2hrv";

const PHP_RATE = 58.50;
const BACKEND_PORT = 8000;

const productListEl = document.getElementById('product-list');
const cartListEl = document.getElementById('cart-list');
const cartCountEl = document.getElementById('cart-count');
const totalEl = document.getElementById('total');
const checkoutForm = document.getElementById('checkout-form');
const confirmCheckoutBtn = document.getElementById('confirm-checkout');
const cartTotalItemsEl = document.getElementById('cart-total-items');
const authButtonContainer = document.getElementById('auth-button-container');

const productList = [
    { id: 1, name: "Laptop Pro X", price: 75988.50, desc: "High-performance laptop for professionals.", stock: 10 },
    { id: 2, name: "Wireless Headphones Z", price: 11699.42, desc: "Noise-cancelling headphones with deep bass.", stock: 25 },
    { id: 3, name: "Smartphone 15 Ultra", price: 58441.50, desc: "Latest flagship smartphone with advanced camera.", stock: 15 },
    { id: 4, name: "Smart Watch 6", price: 14595.75, desc: "Fitness and health tracker with 5-day battery life.", stock: 30 },
    { id: 5, name: "Portable SSD 1TB", price: 5264.42, desc: "Ultra-fast external storage for backups and transfers.", stock: 40 },
    { id: 6, name: "Gaming Mouse RGB", price: 2924.42, desc: "Ergonomic gaming mouse with customizable RGB lighting.", stock: 50 },
    { id: 7, name: "Mechanical Keyboard", price: 6950.10, desc: "Tactile mechanical keyboard for typing and gaming.", stock: 20 },
    { id: 8, name: "Bluetooth Speaker Mini", price: 2047.50, desc: "Pocket-sized speaker with powerful sound.", stock: 60 },
    { id: 9, name: "4K Webcam", price: 4679.42, desc: "High-resolution webcam for streaming and video calls.", stock: 18 },
    { id: 10, name: "E-Reader Paperbook 4", price: 7604.94, desc: "Glare-free screen for comfortable reading.", stock: 22 },
    { id: 11, name: "Mesh Wi-Fi System", price: 11641.50, desc: "Blanket your home with fast, reliable Wi-Fi.", stock: 12 },
    { id: 12, name: "Drone Explorer SE", price: 20474.92, desc: "Foldable drone with 4K video recording.", stock: 8 },
    { id: 13, name: "USB-C Hub 7-in-1", price: 2337.07, desc: "Expand your laptop's connectivity with multiple ports.", stock: 75 },
    { id: 14, name: "Portable Power Bank 20K", price: 2632.50, desc: "High-capacity power bank for multiple charges.", stock: 90 },
    { id: 15, name: "VR Headset", price: 23365.50, desc: "Immersive virtual reality experience.", stock: 11 },
    { id: 16, name: "Stylus Pen Pro", price: 1169.44, desc: "Precision stylus for tablets and touchscreens.", stock: 100 },
    { id: 17, name: "Smart Home Hub", price: 5206.50, desc: "Control all your smart devices from one place.", stock: 14 },
    { id: 18, name: "Laser Projector Compact", price: 35041.50, desc: "Portable projector for a cinema experience anywhere.", stock: 7 },
    { id: 19, name: "Gaming Headset Elite", price: 4414.67, desc: "Comfortable over-ear headset with clear mic.", stock: 33 },
    { id: 20, name: "Tablet Slim 11-inch", price: 23341.50, desc: "Lightweight tablet perfect for media consumption.", stock: 16 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
async function fetchProductImage(query) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " shoes")}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    const data = await res.json();
    // Return the first image URL or a fallback if none found
    return data.photos?.[0]?.src?.medium || "https://picsum.photos/400/280?random=" + Math.random();
  } catch (err) {
    console.error("Error fetching image for", query, err);
    return "https://picsum.photos/400/280?random=" + Math.random(); // fallback image
  }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProducts() {
    productListEl.innerHTML = '';

    productList.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'col';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.name}</h5>
                    <p class="card-text text-secondary">${prod.desc}</p>
                    <p class="card-text fw-bold mt-auto fs-4 text-success">₱${prod.price.toFixed(2)}</p>
                    <button class="btn btn-primary mt-3 btn-add-to-cart" data-id="${prod.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productListEl.appendChild(col);
    });

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const prod = productList.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (prod && prod.stock <= 0) {
        alert(`${prod.name} is currently out of stock!`);
        return;
    }

    if (item) {
        const currentStock = productList.find(p => p.id === id).stock;
        if (item.qty + 1 > currentStock) {
            alert(`Maximum stock reached for ${prod.name}!`);
            return;
        }
        item.qty += 1;
    } else {
        if (prod) {
            cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
        }
    }

    saveCart();
    renderCart();
}

function updateCart(id, delta) {
    const item = cart.find(i => i.id === id);
    const prod = productList.find(p => p.id === id);
    
    if (item) {
        if (delta > 0 && item.qty + delta > prod.stock) {
            alert(`Cannot add more. Only ${prod.stock} in stock for ${prod.name}.`);
            return;
        }

        item.qty += delta;
        
        if (item.qty <= 0) {
            removeFromCart(id);
            return;
        }

        saveCart();
        renderCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    cartListEl.innerHTML = '';
    let total = 0;
    let totalItemsCount = 0;

    if (cart.length === 0) {
        cartListEl.innerHTML = '<li class="list-group-item text-center text-muted py-4">Your cart is empty.</li>';
        document.getElementById('checkout-container').style.display = 'none';
    } else {
        document.getElementById('checkout-container').style.display = 'block';

        cart.forEach(item => {
            total += item.price * item.qty;
            totalItemsCount += item.qty;

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            li.innerHTML = `
                <span class="text-truncate" style="max-width: 40%;">${item.name} <strong class="text-muted"></strong></span>
                <div class="d-flex align-items-center">
                    <div class="btn-group btn-group-sm me-3" role="group" aria-label="Quantity controls">
                        <button type="button" class="btn btn-outline-secondary btn-update-cart" data-action="decrease" data-id="${item.id}">-</button>
                        <span class="btn btn-outline-secondary disabled">${item.qty}</span>
                        <button type="button" class="btn btn-outline-secondary btn-update-cart" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                    
                    <span class="fw-bold me-3 text-success">₱${(item.price * item.qty).toFixed(2)}</span>

                    <button type="button" class="btn btn-danger btn-sm btn-remove-item" data-id="${item.id}" aria-label="Remove button">❌</button>
                </div>
            `;
            cartListEl.appendChild(li);
        });
    }

    totalEl.innerText = total.toFixed(2);
    cartCountEl.innerText = totalItemsCount;
    cartTotalItemsEl.innerText = cart.length; 

    document.querySelectorAll('.btn-update-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            const action = e.currentTarget.dataset.action;
            const delta = action === 'increase' ? 1 : -1;
            updateCart(id, delta);
        });
    });

    document.querySelectorAll('.btn-remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            removeFromCart(id);
        });
    });
}

confirmCheckoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    if (!name || !email || !address) {
        alert('Please fill out all checkout fields.');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const total = parseFloat(totalEl.innerText); 

    const order = {
        customer: { name, email, address },
        items: cart,
        total: total,
    };

    try {
        const res = await fetch(`http://localhost:${BACKEND_PORT}/checkout`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert(`✅ Order placed! Order ID: ${data.orderId}. Thank you!`);
            
            cart = [];
            saveCart();
            renderCart();
            checkoutForm.reset();

            const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cart-section'));
            if(cartOffcanvas) {
                cartOffcanvas.hide();
            }

        } else {
            throw new Error(data.message || 'Server error during checkout.');
        }

    } catch (err) {
        console.error('Checkout failed:', err);
        alert('❌ There was an error placing the order. Please ensure your Node.js server is running and connected to MongoDB Atlas on port 8000.');
    }
});

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function updateAuthUI() {
    const token = localStorage.getItem('kuya_store_token');
    const isLoggedIn = !!token;
    
    if (isLoggedIn) {
        const user = parseJwt(token);
        const username = user ? user.username : 'User';

        authButtonContainer.innerHTML = `
            <span class="navbar-text me-2 text-white">
                <i class="fas fa-user-circle"></i> Hello, ${username}!
            </span>
            <button class="btn btn-outline-danger" type="button" id="logout-btn">
                Logout
            </button>
        `;
        document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
        authButtonContainer.innerHTML = `
            <button class="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#login-modal">
                <i class="fas fa-user-circle"></i> Login
            </button>
        `;
    }
}

function logout() {
    localStorage.removeItem('kuya_store_token');
    alert('You have been logged out.');
    updateAuthUI();
}

async function handleAuthFormSubmit(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return; 

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch(`http://localhost:${BACKEND_PORT}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert(`✅ ${result.message}`);
                form.reset();
                
                if (endpoint === '/api/login' && result.token) {
                    localStorage.setItem('kuya_store_token', result.token);
                    updateAuthUI(); 
                }
                
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('login-modal'));
                if(loginModal) {
                    loginModal.hide();
                }
                
                if (endpoint === '/api/register') {
                    document.getElementById('toggle-login-register').click();
                }

            } else {
                alert(`❌ Error: ${result.message || 'An error occurred.'}`);
            }

        } catch (error) {
            console.error('Authentication request failed:', error);
            alert('❌ A network error occurred. Check server connection on port 8000.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateAuthUI(); 
    
    handleAuthFormSubmit('register-form', '/api/register');
    handleAuthFormSubmit('login-form', '/api/login'); 
});