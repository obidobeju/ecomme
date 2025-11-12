# 🎯 Quick Test Guide - 5 Minutes

## Before You Start
✅ Backend running: `npm start`  
✅ Logged in as admin

---

## Test 1: Create Product (2 min)

```
1. Go to /admin.html
2. Click "Add New Product" button
3. Fill form:
   Name:        iPhone 16 Pro
   Price:       60000
   Stock:       15
   Description: Latest iPhone with AI features
   Image:       (leave blank)
4. Click "Save Product"
5. See: "Product created successfully!"
```

✅ **Expected:** Product appears in products list below form

---

## Test 2: Check Store (1 min)

```
1. Open new tab: /index.html
2. Scroll down to products section
3. Look for "iPhone 16 Pro"
4. Check:
   ✓ Product name visible
   ✓ Realistic phone image showing
   ✓ Price shows ₱60,000
   ✓ Stock shows 15
```

✅ **Expected:** Product shows with realistic image from Pexels

---

## Test 3: Add to Cart (1 min)

```
1. On /index.html, find "iPhone 16 Pro"
2. Click "Add to Cart" button
3. See: "iPhone 16 Pro added to cart!"
4. Check: Cart count increases (top right)
5. Click: Cart button to view items
```

✅ **Expected:** Product added to cart successfully

---

## Test 4: Delete Product (1 min)

```
1. Go to /admin.html
2. Find "iPhone 16 Pro" in products list
3. Click "Delete" button
4. Confirm: "Are you sure?"
5. See: "Product deleted successfully!"
```

✅ **Expected:** Product removed from admin list

**Bonus:** Go back to /index.html and product is gone!

---

## Summary

| Test | Result |
|------|--------|
| Create | ✅ Works |
| Image | ✅ Realistic |
| Store | ✅ Shows product |
| Cart | ✅ Adds item |
| Delete | ✅ Removes product |

---

## If Something Doesn't Work

| Issue | Fix |
|-------|-----|
| "Loading products..." stuck | Check backend is running |
| Images don't load | Check WiFi connection |
| Delete doesn't work | Refresh page and try again |
| Products don't appear | Wait 3 seconds, then refresh |

---

**Time to complete:** ~5 minutes  
**What you'll have:** Fully working admin product system ✓
