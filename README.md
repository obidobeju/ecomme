# TECHHUB E-Commerce Platform with Authentication & Admin Panel

A full-stack e-commerce application with user authentication, admin dashboard, and product management system.

## 🚀 Features

### User Features
- **User Registration & Login**: Create an account or log in to access shopping features
- **Product Browsing**: View all available products with details
- **Shopping Cart**: Add items to cart (requires authentication)
- **Checkout**: Place orders with customer details (requires authentication)
- **User Dashboard**: View your orders and account info

### Admin Features
- **Product Management (CRUD)**:
  - Create new products with name, description, price, stock, and image
  - Edit existing products
  - Delete products
- **Order Management**:
  - View all customer orders
  - Update order status (Pending → Processing → Shipped → Delivered)
  - View order details
- **Admin Dashboard**: Access restricted admin panel for managing the store

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance via MongoDB Atlas)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone/Download the Project
```bash
cd yawa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure MongoDB Connection
Edit `backend/server.js` and update the MongoDB URI:

```javascript
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://username:password@cluster.mongodb.net/yawa?retryWrites=true&w=majority';
```

Or set environment variable:
```bash
set MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/yawa
```

### 4. Start the Backend Server
```bash
npm start
```

The server will run on `http://localhost:8000`

### 5. Open Frontend in Browser
Open `index.html` in your web browser (or use Live Server)

## 👥 Demo Accounts

### Regular User Account
- **Username**: `user`
- **Email**: `user@example.com`
- **Password**: `user123`

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`

Or create your own accounts by registering on the registration page.

## 🌐 Pages & Routes

### Public Pages
- **`index.html`** - Home page with product listing
- **`about.html`** - About the store
- **`login.html`** - User login page
- **`register.html`** - User registration page

### Protected Pages (Require Authentication)
- **`admin.html`** - Admin dashboard (admin only)
  - Manage products (Create, Read, Update, Delete)
  - Manage orders (view and update status)

### Features Protection
- **Add to Cart**: ✅ Requires login
- **Checkout**: ✅ Requires login
- **Admin Panel**: ✅ Requires admin role

## 🔐 Authentication Flow

### Registration
1. User visits `register.html`
2. User fills in username, email, password, and selects role (User/Admin)
3. Account is created in MongoDB
4. User is automatically logged in
5. JWT token is stored in localStorage
6. User is redirected to appropriate dashboard

### Login
1. User visits `login.html`
2. User enters username and password
3. Credentials are verified against MongoDB
4. JWT token is generated and stored
5. User is redirected to their dashboard

### Token Management
- Tokens are stored in localStorage as `authToken`
- Tokens expire after 7 days
- Tokens are sent with all protected API requests
- Logout clears the token and user session

## 📦 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Products (Admin Only)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /checkout` - Create new order (requires auth)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order (auth required)
- `PUT /api/orders/:id` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

## 📱 Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (Vanilla)
- Pexels API for product images

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- CORS

## 🎯 User Workflow

### As a Regular User
1. Register or login
2. Browse products on home page
3. Click "Add to Cart" to add items
4. Click cart button to view cart
5. Fill in checkout details (name, email, address)
6. Click "Place Order" to complete purchase
7. Order is saved and confirmation is shown

### As an Admin
1. Register with Admin role or login as admin
2. Click "Admin" button in navbar to access dashboard
3. **Products Tab**:
   - View all products
   - Click "Add New Product" to create
   - Click "Edit" to modify existing product
   - Click "Delete" to remove product
4. **Orders Tab**:
   - View all customer orders
   - Change order status from dropdown
   - Click "View" to see order details

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (User/Admin)
- Protected API endpoints
- Token expiration (7 days)
- CORS enabled for secure requests

## 📝 File Structure

```
yawa/
├── index.html              # Home page
├── login.html              # Login page
├── register.html           # Registration page
├── admin.html              # Admin dashboard
├── about.html              # About page
├── style.css               # Styling
├── script.js               # Frontend logic
├── auth.js                 # Authentication helper functions
├── package.json            # Node dependencies
└── backend/
    └── server.js           # Express backend server
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB URI in `server.js`
- Ensure MongoDB is running locally or credentials are correct for Atlas
- Check network connection

### "Checkout fails"
- Ensure you are logged in
- Check that cart has items
- Fill in all checkout fields
- Check backend server is running

### "Admin page shows error"
- Verify you're logged in with admin account
- Check that role is set to 'admin' in your user account
- Try logging out and logging back in

### "Products not loading"
- Check browser console for errors
- Ensure backend server is running on port 8000
- Check CORS settings in backend

## 🚀 Future Enhancements

- Payment gateway integration
- Email notifications
- Order tracking
- Product reviews and ratings
- Wishlist feature
- Advanced search and filtering
- User profile management
- Inventory notifications
- Dashboard analytics

## 📄 License

ISC License

## 👨‍💻 Support

For issues or questions, check the console logs for error messages and ensure:
1. Backend server is running
2. MongoDB connection is valid
3. All dependencies are installed
4. Port 8000 is not in use

---

**Happy Shopping! 🛒**
