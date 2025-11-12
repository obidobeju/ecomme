// auth.js - Authentication handler
const BACKEND_URL = `http://192.168.1.12:8000`;

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Save auth info to localStorage
function saveAuth(token, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Clear auth info from localStorage
function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getAuthToken();
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Logout user
function logout() {
    try {
        clearAuth();
        // Force complete cache bust and page reload
        const timestamp = new Date().getTime();
        window.location.href = 'index.html?logout=' + timestamp;
    } catch (e) {
        console.error('Logout error:', e);
        // Fallback: just clear storage and reload
        localStorage.clear();
        sessionStorage.clear();
        location.reload(true);
    }
}

// Register user
async function registerUser(username, email, password, isAdmin = false) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                role: isAdmin ? 'admin' : 'user'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        saveAuth(data.token, data.user);
        return data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

// Login user
async function loginUser(username, password) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        saveAuth(data.token, data.user);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Fetch with auth token
async function authenticatedFetch(url, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    return response;
}

// Get all products
async function getProducts() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/products`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch products');
        }
        return data.products || [];
    } catch (error) {
        console.error('Get products error:', error);
        return [];
    }
}

// Create product (admin)
async function createProduct(product) {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/api/products`, {
            method: 'POST',
            body: JSON.stringify(product)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create product');
        }

        return data.product;
    } catch (error) {
        console.error('Create product error:', error);
        throw error;
    }
}

// Update product (admin)
async function updateProduct(productId, updates) {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update product');
        }

        return data.product;
    } catch (error) {
        console.error('Update product error:', error);
        throw error;
    }
}

// Delete product (admin)
async function deleteProduct(productId) {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/api/products/${productId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete product');
        }

        return data;
    } catch (error) {
        console.error('Delete product error:', error);
        throw error;
    }
}

// Create order/checkout
async function createOrder(customerInfo, items, total) {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/checkout`, {
            method: 'POST',
            body: JSON.stringify({
                customer: customerInfo,
                items: items,
                total: total
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Checkout failed');
        }

        return data;
    } catch (error) {
        console.error('Checkout error:', error);
        throw error;
    }
}

// Get all orders (admin)
async function getOrders() {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/api/orders`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch orders');
        }

        return data.orders || [];
    } catch (error) {
        console.error('Get orders error:', error);
        throw error;
    }
}

// Update order status (admin)
async function updateOrderStatus(orderId, status) {
    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/api/orders/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update order');
        }

        return data.order;
    } catch (error) {
        console.error('Update order error:', error);
        throw error;
    }
}

// Update navbar with auth info
function updateAuthUI() {
    const user = getCurrentUser();
    const authContainer = document.getElementById('auth-container');

    if (!authContainer) return;

    if (user && isAuthenticated()) {
        // User is logged in
        authContainer.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="text-light me-2">👤 ${user.username}</span>
                ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-sm btn-warning me-2"><i class="fas fa-cog me-1"></i> Admin</a>' : ''}
                <button class="btn btn-sm btn-outline-danger" onclick="logout()"><i class="fas fa-sign-out-alt me-1"></i> Logout</button>
            </div>
        `;
    } else {
        // User not logged in - clear any stale data
        clearAuth();
        authContainer.innerHTML = `
            <div class="d-flex gap-2">
                <a href="login.html" class="btn btn-sm btn-outline-primary"><i class="fas fa-sign-in-alt me-1"></i> Login</a>
                <a href="register.html" class="btn btn-sm btn-primary"><i class="fas fa-user-plus me-1"></i> Register</a>
            </div>
        `;
    }
}

// Check authentication and redirect if needed
function requireAuth() {
    if (!isAuthenticated()) {
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
    }
}

// Check admin authentication and redirect if needed
function requireAdmin() {
    if (!isAuthenticated() || !isAdmin()) {
        window.location.href = 'login.html';
    }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    // Re-check auth status when page becomes visible (tab focus)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateAuthUI();
        }
    });
});

// Also update UI immediately if script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
} else {
    updateAuthUI();
}
