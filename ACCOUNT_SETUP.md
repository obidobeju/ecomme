# 🔑 Getting Started - Account Creation Guide

## ❌ Problem You're Facing

You're trying to login with credentials that don't exist in the database yet.

```
Username: admin
Password: admin123
Error: ❌ Invalid credentials
```

## ✅ Solution: Create Your Account First

The system is **brand new** and has no accounts yet. You need to **register** before you can login.

---

## 🚀 Quick Start (Choose One)

### Option 1: Create Admin Account
This gives you full access to manage products and orders.

1. **Click "Register here"** on the login page
2. **Fill in the form:**
   ```
   Username:        admin
   Email:           admin@techhub.com
   Password:        admin123
   Confirm Pass:    admin123
   Account Type:    ⚙️ Admin
   ```
3. **Click "Create Account"**
4. ✅ You're logged in as admin!
5. Click **"Admin"** button in navbar to access dashboard

### Option 2: Create Regular User Account
This lets you shop and checkout.

1. **Click "Register here"** on the login page
2. **Fill in the form:**
   ```
   Username:        user
   Email:           user@example.com
   Password:        user123
   Confirm Pass:    user123
   Account Type:    🛍️ Regular User
   ```
3. **Click "Create Account"**
4. ✅ You're logged in as user!
5. Browse products and add to cart

### Option 3: Create Multiple Accounts
Create both admin and user accounts for testing.

1. Register admin account (see Option 1)
2. Click Logout
3. Go to register.html
4. Register user account (see Option 2)
5. Login with admin account to manage
6. Logout and login with user account to shop

---

## 📝 Account Types Explained

### 👤 Regular User
What you can do:
- ✅ Browse all products
- ✅ Add items to cart
- ✅ Checkout and place orders
- ✅ View your account info

Cannot:
- ❌ Access admin dashboard
- ❌ Manage products
- ❌ Manage orders

### ⚙️ Admin
What you can do:
- ✅ Access admin dashboard
- ✅ Create new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ View all orders
- ✅ Update order status
- ✅ Manage the entire store

Plus everything a regular user can do!

---

## 🔐 Password Requirements

When registering:
- ✅ Minimum **6 characters**
- ✅ Cannot be empty
- ✅ Must match confirmation

Example: `admin123` ✓ (8 characters)

---

## 💾 Account Storage

- Accounts are stored in **MongoDB database**
- Passwords are **hashed** (secure)
- Data persists across sessions
- Cannot login without registering first

---

## ✅ Verification Checklist

- [ ] Go to register.html
- [ ] Fill in all fields
- [ ] Select account type (Admin or User)
- [ ] Click "Create Account"
- [ ] See success message
- [ ] Automatically logged in
- [ ] See username in navbar
- [ ] Now you can shop or manage!

---

## 🆘 Still Having Issues?

### "Registration fails"
- Check all fields are filled
- Password must be 6+ characters
- Confirm passwords match
- Email format must be valid (example@domain.com)

### "Registration succeeds but can't login"
- Clear browser cache
- Refresh the page
- Try opening in new tab
- Check MongoDB is running

### "Admin dashboard won't load"
- Make sure you registered as **Admin** (not User)
- Make sure backend is running (`npm start`)
- Clear browser cache
- Try private/incognito window

### "Products not showing"
- Ensure backend is running
- Check browser console for errors (F12)
- Verify MongoDB connection

---

## 🎯 Next Steps After Registration

1. **If Admin**: Go to admin.html to manage products
2. **If User**: Browse products and add to cart
3. **Either way**: Try checkout (requires login!)
4. **Test features**: Logout and login again

---

## 📖 For More Details

- See **QUICKSTART.md** - Quick start guide
- See **TESTING.md** - Test scenarios
- See **README.md** - Complete documentation

---

**Good luck! Your accounts are ready to be created! 🚀**
