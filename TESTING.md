# TECHHUB - Quick Start & Testing Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Start Backend Server
```bash
npm start
```
Server will run on `http://localhost:8000`

### Step 2: Open Frontend
Open `index.html` in your browser (or use VS Code Live Server)

### Step 3: You're Ready!
Click "Register" or "Login" to get started

---

## 🧪 Testing Scenarios

### Test 1: User Registration & Login

**Scenario**: Create a new user account
1. Go to `http://localhost/register.html`
2. Fill in:
   - Username: `testuser`
   - Email: `testuser@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Role: `🛍️ Regular User`
3. Click "Create Account"
4. ✅ You should be logged in and redirected to home page
5. See your username in navbar

**Scenario**: Login with existing account
1. Go to `login.html`
2. Username: `admin`
3. Password: `admin123`
4. ✅ Login successful, redirected to home page

---

### Test 2: Add to Cart (Protected Feature)

**Scenario**: Add item to cart without login
1. Go to home page
2. Click any product's "Add to Cart" button
3. ✅ Alert: "Please log in to add items to your cart"
4. Click OK and redirected to login page

**Scenario**: Add item to cart while logged in
1. Login first (use credentials above)
2. Click "Add to Cart" on any product
3. ✅ Item added silently
4. Click "Cart" button to view
5. See item in shopping cart

---

### Test 3: Checkout (Protected Feature)

**Scenario**: Checkout without login
1. Without login, try to open cart from button
2. Add items manually to localStorage (skip this in normal flow)
3. Try checkout
4. ✅ Alert: "Please log in to complete your order"

**Scenario**: Complete checkout
1. Login first
2. Add 2-3 items to cart
3. Click "Cart" button
4. Fill in:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Address: `123 Main St, City, Country`
5. Click "Place Order"
6. ✅ Success! Order confirmation with Order ID
7. Cart is cleared

---

### Test 4: Admin Login & Dashboard

**Scenario**: Login as admin
1. Go to `login.html`
2. Username: `admin`
3. Password: `admin123`
4. Click "Sign In"
5. ✅ Logged in, see "Admin" button in navbar
6. Click "Admin" button
7. ✅ Redirected to `admin.html`

**Scenario**: Access admin page without login
1. Clear localStorage: `localStorage.clear()`
2. Go directly to `admin.html`
3. ✅ Redirected to login page

**Scenario**: Try admin page as regular user
1. Login with regular user account
2. Try to access `admin.html` directly
3. ✅ Redirected to login page (no admin access)

---

### Test 5: Admin - Create Product

**Scenario**: Add a new product
1. Login as admin
2. Go to Admin Panel
3. Click "Add New Product" button
4. Fill in:
   - Product Name: `USB-C Hub`
   - Description: `Fast 7-in-1 USB hub`
   - Price (₱): `2500.00`
   - Stock: `50`
   - Image URL: (leave empty for now)
5. Click "Save Product"
6. ✅ Success message appears
7. Product appears in the product list

---

### Test 6: Admin - Edit Product

**Scenario**: Modify existing product
1. In Admin Panel, find a product
2. Click "Edit" button
3. Change Price to: `2999.99`
4. Change Stock to: `75`
5. Click "Save Product"
6. ✅ Product updated successfully

---

### Test 7: Admin - Delete Product

**Scenario**: Remove a product
1. In Admin Panel, find a product
2. Click "Delete" button
3. ✅ Confirmation dialog appears
4. Confirm deletion
5. ✅ Product removed from list

---

### Test 8: Admin - View & Update Orders

**Scenario**: View customer orders
1. Login as admin
2. Go to Admin Panel
3. Click "Orders" tab
4. ✅ See all orders in table with:
   - Order ID
   - Customer name
   - Total amount
   - Current status
   - Order date

**Scenario**: Update order status
1. In Orders tab, find an order
2. Click status dropdown for an order
3. Change from `Pending` to `Processing`
4. ✅ Status updates immediately
5. Try other statuses: Shipped, Delivered, Cancelled

---

### Test 9: Logout

**Scenario**: Logout from user account
1. While logged in, see logout button in navbar
2. Click "Logout" button
3. ✅ Logged out, navbar shows Login/Register buttons
4. Try to access protected features
5. ✅ Redirected to login

---

### Test 10: Cart Persistence

**Scenario**: Cart persists across page refresh
1. Login and add items to cart
2. Close tab or refresh page
3. ✅ Cart items still there
4. Logout and login again
5. ✅ Cart items still there (stored in localStorage)

---

## 🔑 Test Accounts

| Role | Username | Password | Purpose |
|------|----------|----------|---------|
| Admin | `admin` | `admin123` | Full access, manage products & orders |
| User | `user` | `user123` | Shop, view orders |

Create your own accounts with the registration page!

---

## 📊 Sample Data to Test With

### Test Products
- Name: `Gaming Laptop`, Price: `₱89,999`, Stock: `10`
- Name: `Wireless Mouse`, Price: `₱2,999`, Stock: `100`
- Name: `USB-C Hub`, Price: `₱3,499`, Stock: `50`

### Test Orders
Create orders with different customer info to test order management:
- Name: `Alice Johnson`, Email: `alice@example.com`, Address: `456 Park Ave`
- Name: `Bob Smith`, Email: `bob@example.com`, Address: `789 Oak Street`

---

## 🐛 Common Issues & Fixes

### Issue: Backend won't start
```
Error: Cannot find module 'bcrypt'
```
**Fix**: Run `npm install`

### Issue: MongoDB connection error
```
MongoDB connection error: Failed to connect
```
**Fix**: 
1. Check MongoDB URI in `backend/server.js`
2. If using MongoDB Atlas, check credentials
3. Allow your IP in MongoDB Atlas network access

### Issue: CORS error in console
```
Access to XMLHttpRequest blocked by CORS
```
**Fix**: Backend is not running. Run `npm start`

### Issue: Cart button doesn't work
```
Cannot read properties of null
```
**Fix**: Make sure auth.js is loaded before script.js

---

## ✅ Checklist for Full Testing

- [ ] User can register
- [ ] User can login
- [ ] User cannot add to cart without login
- [ ] User can add to cart while logged in
- [ ] User can checkout successfully
- [ ] Admin can login
- [ ] Admin can access admin panel
- [ ] Admin can create products
- [ ] Admin can edit products
- [ ] Admin can delete products
- [ ] Admin can view orders
- [ ] Admin can change order status
- [ ] Regular user cannot access admin panel
- [ ] Cart persists on page refresh
- [ ] Logout works correctly
- [ ] All links and navigation work

---

## 📞 API Testing with Postman

### Register New User
```
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login User
```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Create Product (Admin)
```
POST http://localhost:8000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "New Product",
  "desc": "Product description",
  "price": 5999.99,
  "stock": 30,
  "image": "https://example.com/image.jpg"
}
```

### Create Order (User)
```
POST http://localhost:8000/checkout
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St"
  },
  "items": [
    {"id": 1, "name": "Product", "price": 1000, "qty": 2}
  ],
  "total": 2000
}
```

---

**Happy Testing! 🎉**
