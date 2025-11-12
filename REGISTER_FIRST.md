# 📸 Step-by-Step: How to Create Your First Account

## Problem
You're seeing "Invalid credentials" when trying to login with admin/admin123

## Reason
Those credentials don't exist yet. You need to **create them first** by registering.

---

## 🎯 Solution: 5 Simple Steps

### Step 1: Open Registration Page
- On the login page, click **"Register here"** link at the bottom
- Or go directly to: `register.html`

✅ You should see the registration form

---

### Step 2: Fill In Username
```
Field: Username
Enter: admin
Purpose: Your unique login username
```

### Step 3: Fill In Email
```
Field: Email
Enter: admin@techhub.com (or any email)
Purpose: Account contact and recovery
```

### Step 4: Create Password
```
Field: Password
Enter: admin123
Note: Must be at least 6 characters
```

### Step 5: Confirm Password
```
Field: Confirm Password
Enter: admin123
Note: Must match password above
```

### Step 6: Select Account Type
```
Dropdown: Account Type
Choose: ⚙️ Admin
Note: Admin gets access to the admin dashboard
      User just gets shopping access
```

### Step 7: Click "Create Account"
Button will be **green** with checkmark icon

---

## ✅ What Happens Next

1. Form is validated
2. Password is hashed securely
3. Account saved to MongoDB
4. **Automatically logged in!**
5. Redirected to home page or admin page
6. See username in navbar

---

## 🔄 Now You Can Login

After registering, you can:
1. Click Logout
2. Go back to login.html
3. Enter credentials:
   ```
   Username: admin
   Password: admin123
   ```
4. ✅ Login successful!

---

## 📊 Visual Flow

```
┌─────────────────┐
│   Login Page    │
│  (Invalid creds)│
└────────┬────────┘
         │
         ▼ Click "Register here"
┌─────────────────────┐
│ Registration Page   │
│  (Registration Form)│
└────────┬────────────┘
         │
         ▼ Fill all fields
┌────────────────────┐
│ Select Admin Role  │
└────────┬───────────┘
         │
         ▼ Click "Create Account"
┌──────────────────────────┐
│ Account Created! ✅       │
│ Automatically Logged In  │
│ See Username in Navbar   │
└──────────────────────────┘
         │
         ▼ You can now:
    ┌────┴────┐
    │          │
    ▼          ▼
 Access      Browse
 Admin      Products
Dashboard
```

---

## 🎯 Which Account Type to Choose?

### 👤 Regular User (🛍️)
**Choose this if you want to:**
- Browse products
- Add items to cart
- Place orders
- Shop like a customer

---

### ⚙️ Admin (⚙️)
**Choose this if you want to:**
- Manage all products
- Create new products
- Edit product prices/stock
- Delete products
- View all customer orders
- Update order status
- Manage the entire store

**Note**: Admins can ALSO shop (regular user features included)

---

## 🚨 Troubleshooting Registration

### Issue: "Please fill in all fields"
✅ **Solution**: Make sure all fields have values:
- [ ] Username - not empty
- [ ] Email - valid format
- [ ] Password - 6+ characters
- [ ] Confirm Password - matches password
- [ ] Role - selected from dropdown

### Issue: "Passwords do not match"
✅ **Solution**: 
- Password field: `admin123`
- Confirm Password: `admin123`
- They must be EXACTLY the same

### Issue: "Username already exists"
✅ **Solution**: 
- Username is taken
- Try different username like: `admin2`, `admin_test`, etc.

### Issue: "Please enter a valid email address"
✅ **Solution**:
- Email format must be: `something@domain.com`
- Example: `admin@techhub.com` ✓
- Example: `admin@gmail.com` ✓
- Example: `admin.test@example.co.uk` ✓

### Issue: "Password must be at least 6 characters"
✅ **Solution**:
- Use longer password
- Example: `admin123` (8 chars) ✓
- Example: `test@123` (8 chars) ✓

---

## ✅ Success Checklist

After registration, you should see:

- [x] Success message: "Account created successfully!"
- [x] **Redirected to home or admin page**
- [x] **Username visible in navbar** (e.g., "👤 admin")
- [x] **"Admin" button** appears if registered as admin
- [x] **"Logout" button** appears
- [x] **"Login/Register" buttons** disappear

---

## 🔄 Quick Test

After registration:

1. **Admin Users**:
   - Click "Admin" button in navbar
   - Should see Admin Dashboard
   - Should see Products & Orders tabs
   - ✅ Success!

2. **Regular Users**:
   - See products on home page
   - Try "Add to Cart"
   - Should NOT see admin button
   - ✅ Success!

---

## 📝 Remember

- **First time**: Go to register.html FIRST
- **Create account**: Username, email, password, role
- **Then**: Login with those credentials
- **Demo credentials**: These are for AFTER you create them

---

## 🎉 You're Ready!

Follow these steps and you'll have a working account in less than 1 minute!

Good luck! 🚀
