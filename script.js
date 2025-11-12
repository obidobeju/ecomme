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
    { id: 1, name: "Laptop Pro X", price: 75988.50, desc: "High-performance laptop for professionals.", stock: 10, image: 'assets/laptop.svg' },
    { id: 2, name: "Wireless Headphones Z", price: 11699.42, desc: "Noise-cancelling headphones with deep bass.", stock: 25, image: 'assets/headphones.svg' },
    { id: 3, name: "Smartphone 15 Ultra", price: 58441.50, desc: "Latest flagship smartphone with advanced camera.", stock: 15, image: 'assets/smartphone.svg' },
    { id: 4, name: "Smart Watch 6", price: 14595.75, desc: "Fitness and health tracker with 5-day battery life.", stock: 30, image: 'assets/smartwatch.svg' },
    { id: 5, name: "Portable SSD 1TB", price: 5264.42, desc: "Ultra-fast external storage for backups and transfers.", stock: 40, image: 'assets/ssd.svg' },
    { id: 6, name: "Gaming Mouse RGB", price: 2924.42, desc: "Ergonomic gaming mouse with customizable RGB lighting.", stock: 50, image: 'assets/mouse.svg' },
    { id: 7, name: "Mechanical Keyboard", price: 6950.10, desc: "Tactile mechanical keyboard for typing and gaming.", stock: 20, image: 'assets/keyboard.svg' },
    { id: 8, name: "Bluetooth Speaker Mini", price: 2047.50, desc: "Pocket-sized speaker with powerful sound.", stock: 60, image: 'assets/speaker.svg' },
    { id: 9, name: "4K Webcam", price: 4679.42, desc: "High-resolution webcam for streaming and video calls.", stock: 18, image: 'assets/webcam.svg' },
    { id: 10, name: "E-Reader Paperbook 4", price: 7604.94, desc: "Glare-free screen for comfortable reading.", stock: 22, image: 'assets/ereader.svg' },
    { id: 11, name: "Mesh Wi-Fi System", price: 11641.50, desc: "Blanket your home with fast, reliable Wi-Fi.", stock: 12, image: 'assets/router.svg' },
    { id: 12, name: "Drone Explorer SE", price: 20474.92, desc: "Foldable drone with 4K video recording.", stock: 8, image: 'assets/drone.svg' },
    { id: 13, name: "USB-C Hub 7-in-1", price: 2337.07, desc: "Expand your laptop's connectivity with multiple ports.", stock: 75, image: 'assets/hub.svg' },
    { id: 14, name: "Portable Power Bank 20K", price: 2632.50, desc: "High-capacity power bank for multiple charges.", stock: 90, image: 'assets/powerbank.svg' },
    { id: 15, name: "VR Headset", price: 23365.50, desc: "Immersive virtual reality experience.", stock: 11, image: 'assets/vr.svg' },
    { id: 16, name: "Stylus Pen Pro", price: 1169.44, desc: "Precision stylus for tablets and touchscreens.", stock: 100, image: 'assets/stylus.svg' },
    { id: 17, name: "Smart Home Hub", price: 5206.50, desc: "Control all your smart devices from one place.", stock: 14, image: 'assets/smarthome.svg' },
    { id: 18, name: "Laser Projector Compact", price: 35041.50, desc: "Portable projector for a cinema experience anywhere.", stock: 7, image: 'assets/projector.svg' },
    { id: 19, name: "Gaming Headset Elite", price: 4414.67, desc: "Comfortable over-ear headset with clear mic.", stock: 33, image: 'assets/gamingheadset.svg' },
    { id: 20, name: "Tablet Slim 11-inch", price: 23341.50, desc: "Lightweight tablet perfect for media consumption.", stock: 16, image: 'assets/tablet.svg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function deriveImageQueryFromName(name) {
    // Try to extract meaningful keywords from the product name to improve image search.
    // This keeps electronics/gadget-related queries instead of generic words.
    if (!name) return 'electronics device';
    // Lowercase, remove punctuation and numbers, split words
    const cleaned = name.replace(/[\d\W_]+/g, ' ').toLowerCase().trim();
    const words = cleaned.split(/\s+/).filter(Boolean);
    // common nouns related to electronics we prefer
    const preferred = ['laptop','phone','smartphone','headphones','watch','ssd','keyboard','mouse','speaker','webcam','drone','power','tablet','projector','vr','stylus','charger','hub','reader','speaker','router'];
    // find first preferred word in name
    for (const w of words) {
        if (preferred.includes(w)) return `${w} electronics`;
    }
    // otherwise use the first two words plus 'electronics'
    return `${words.slice(0,2).join(' ')} electronics`;
}

async function fetchProductImage(productOrQuery) {
    // Accept either a product object (preferred) or a string query.
    let query = typeof productOrQuery === 'string' ? productOrQuery : null;
    if (!query && productOrQuery && typeof productOrQuery === 'object') {
        query = productOrQuery.imageQuery || deriveImageQueryFromName(productOrQuery.name || productOrQuery.title);
    }
    query = query || 'electronics device';

    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
            headers: { Authorization: PEXELS_API_KEY }
        });
        if (!res.ok) throw new Error(`Pexels API returned status ${res.status}`);
        const data = await res.json();
        const photo = data.photos?.[0];
    if (!photo) return `https://picsum.photos/200/140?random=${Math.random()}`;
        return photo.src.tiny || photo.src.small || photo.src.medium || photo.src.original;
    } catch (err) {
        console.error('Error fetching image for', query, err);
        return `https://picsum.photos/200/140?random=${Math.random()}`;
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

        // Render a small image (100x70) at the top of the card using local SVG asset.
        col.innerHTML = `
            <div class="card h-100 shadow-sm d-flex flex-column">
                <div class="p-3 d-flex justify-content-center">
                    <img src="${prod.image}" alt="${prod.name}" 
                         class="product-thumb" style="width:200px;height:140px;object-fit:cover;border-radius:6px;">
                </div>
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

confirmCheckoutBtn.addEventListener('click', (e) => {
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

    // Load existing orders from localStorage
    const ordersRaw = localStorage.getItem('orders') || '[]';
    let orders;
    try { orders = JSON.parse(ordersRaw) || []; } catch { orders = []; }

    const orderNumber = orders.length + 1;
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${orderNumber}`;

    const total = parseFloat(totalEl.innerText);

    const order = {
        id: orderId,
        number: orderNumber,
        customer: { name, email, address },
        items: cart,
        total: total,
        createdAt: new Date().toISOString()
    };

    // Save order to localStorage
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Clear cart from localStorage
    localStorage.removeItem('cart');

    // Update UI
    cart = [];
    renderCart();
    checkoutForm.reset();

    // Close offcanvas
    const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cart-section'));
    if(cartOffcanvas) {
        cartOffcanvas.hide();
    }

    // Show success toast
    showOrderSuccess(order);
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

function showOrderSuccess(order) {
  // Create a top-right toast container if missing
  const containerId = 'toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '1080';
    document.body.appendChild(container);
  }

  // If Bootstrap Toast is available, use it
  if (window.bootstrap?.Toast) {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-success border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.style.minWidth = '240px';

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <strong class="d-block">Order placed</strong>
          <small class="d-block text-white-50">ID: ${order.id}</small>
          <div class="mt-1">Thank you, ${order.customer.name}!</div>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  } else {
    // Fallback: simple dismissible alert
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-success alert-dismissible fade show';
    alertEl.style.minWidth = '240px';
    alertEl.style.marginBottom = '0.5rem';
    alertEl.innerHTML = `
      <strong>Order placed</strong><br><small>ID: ${order.id}</small>
      <div>Thank you, ${order.customer.name}!</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    container.appendChild(alertEl);
    setTimeout(() => {
      alertEl.classList.remove('show');
      alertEl.remove();
    }, 4500);
  }
}

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
    // Auth endpoints removed - frontend-only mode
    console.log('Auth system disabled (frontend-only mode)');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateAuthUI();
    
    // Auth system disabled - frontend-only mode (no login/register)
    console.log('🎯 Frontend-only e-commerce mode active. Checkout works locally.');
});