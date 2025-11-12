# 🚀 TECHHUB - Quick Start Guide

## 📋 What's New?

Your TECHHUB e-commerce platform now has:
- ✅ **User Authentication** (Login/Register)
- ✅ **Protected Shopping Cart** (requires login)
- ✅ **Protected Checkout** (requires login)
- ✅ **Admin Dashboard** (full product & order management)
- ✅ **Role-Based Access Control** (User vs Admin)
- ✅ **MongoDB Database** (persistent data storage)

---

## 🎯 Get Started in 2 Minutes

### ⚠️ IMPORTANT - First Time Users
**You must REGISTER an account FIRST before you can login.**

1. Click "Register" button
2. Fill in: Username, Email, Password, Select Role
3. Click "Create Account"
4. Now you can login with those credentials!

### Step 1: Start the Backend
```bash
npm start
```
You should see:
```
✅ Server is running on http://localhost:8000
✅ Connected to MongoDB
```

### Step 2: Open the Website
Open `index.html` in your browser or use VS Code Live Server

### Step 3: Try It Out!
- Click **"Register"** to create an account (MUST DO THIS FIRST!)
- Fill in form with username, email, password, and role
- Login with the credentials you just created

---

## 👤 Demo Accounts (Ready to Use!)

### Admin Account
```
Username: admin
Password: admin123
```
Access: Full admin dashboard with product/order management

### Regular User Account
```
Username: user
Password: user123
```
Access: Shop, add to cart, checkout

**⚠️ IMPORTANT**: These credentials are examples. You must **REGISTER FIRST** to create these accounts. See "Step 3: Try It Out!" below.

---

## 📖 Quick Navigation

| What | Where |
|------|-------|
| **Home Page** | `index.html` |
| **Login** | `login.html` |
| **Register** | `register.html` |
| **Admin Dashboard** | `admin.html` (after login as admin) |
| **Documentation** | `README.md` |
| **Test Scenarios** | `TESTING.md` |
| **Architecture** | `ARCHITECTURE.md` |

---

## ✨ Feature Highlights

### For Regular Users:
1. **Register New Account**
   - Username, email, password
   - Automatically logged in after registration
   
2. **Browse & Shop**
   - View products on home page
   - "Add to Cart" (requires login!)
   
3. **Checkout**
   - Fill in name, email, address
   - Place order (saved to MongoDB!)
   - Get order confirmation with ID

### For Admins:
1. **Product Management**
   - ✏️ Create new products
   - 📝 Edit existing products
   - 🗑️ Delete products
   - 📊 View all products

2. **Order Management**
   - 👀 View all customer orders
   - 📋 Update order status
   - 💳 See order totals

---

## 🔐 Key Features Explained

### 🔓 Login/Register Protection
- Cart requires login
- Checkout requires login
- Admin page requires admin role
- Automatic redirect if not authenticated

### 🗄️ Database Storage
- User accounts saved in MongoDB
- Products saved in MongoDB
- Orders saved in MongoDB
- Data persists across sessions

### 🛡️ Security
- Passwords hashed with bcrypt
- JWT tokens for authentication
- Role-based access control
- Protected API endpoints

---

## 🧪 Quick Test Flow

Try this to see everything working:

1. **Register** as a new user
   - Go to `register.html`
   - Fill form, select "User" role
   - See navbar show your username

2. **Shop** for products
   - Go to home page
   - Click "Add to Cart" on any product
   - See items in cart (click Cart button)

3. **Checkout**
   - Fill in your details
   - Click "Place Order"
   - See success message with Order ID

4. **Try Admin** (optional)
   - Register another account as "Admin"
   - See "Admin" button in navbar
   - Click to manage products & orders

---

## 🐛 Troubleshooting

### ❌ "Backend connection failed"
```bash
# Make sure backend is running
npm start
```

### ❌ "Cannot add to cart without login"
This is **intentional**! Login first, then add to cart.

### ❌ "Admin page won't load"
Make sure:
- You're logged in
- You registered as admin
- Backend is running

### ❌ "Products not showing"
Check:
- Backend is running on port 8000
- MongoDB connection is working
- No errors in browser console

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `auth.js` | Authentication logic |
| `login.html` | Login page |
| `register.html` | Registration page |
| `admin.html` | Admin dashboard |
| `script.js` | Updated with auth checks |
| `backend/server.js` | Express backend |
| `package.json` | Dependencies (bcrypt, jwt added) |

---

## 🚀 Next Steps

### Try These Actions:

- [ ] Register a new user account
- [ ] Login with the account
- [ ] Add items to cart
- [ ] Checkout and place an order
- [ ] Register as admin
- [ ] Login as admin and visit admin dashboard
- [ ] Create a new product
- [ ] Edit a product
- [ ] Delete a product
- [ ] View orders and change status
- [ ] Logout and try to access cart

---

## 📚 Learn More

Read these files for detailed information:

- **`README.md`** - Complete project documentation
- **`TESTING.md`** - Detailed test scenarios
- **`ARCHITECTURE.md`** - System architecture diagrams
- **`IMPLEMENTATION_SUMMARY.md`** - What was implemented

---

## 💡 Pro Tips

1. **Multiple Accounts**: Register different accounts to test user/admin roles
2. **Test Cart**: Add items, remove them, update quantities
3. **Test Admin**: Create products, edit them, delete them
4. **Check Console**: Open DevTools (F12) to see API calls
5. **Check Database**: Use MongoDB Atlas UI to see stored data

---

## 🎉 You're All Set!

Everything is ready to use. Just:
1. Run `npm start`
2. Open `index.html`
3. Start shopping or managing!

---

## 📞 Quick Reference

### Commands
```bash
npm start           # Start backend server
npm install         # Install dependencies
```

### URLs
```
Frontend:    http://localhost/index.html
Backend:     http://localhost:8000
Login:       http://localhost/login.html
Register:    http://localhost/register.html
Admin:       http://localhost/admin.html
```

### Demo Credentials
```
Admin:   admin / admin123
User:    user / user123
```

---

**Happy Coding! 🚀**

For detailed documentation, see README.md
For test scenarios, see TESTING.md
For architecture details, see ARCHITECTURE.md
