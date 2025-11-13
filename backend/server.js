const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// --- CONFIG ---
// Use environment variable when available, otherwise use the connection string provided.
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://bejuuuu:OBIDO01@cluster0.r6i7ise.mongodb.net/yawa?retryWrites=true&w=majority';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static(path.join(__dirname, '..')));

// JWT verification middleware
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
    
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    jwt.verify(actualToken, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
        req.user = decoded;
        next();
    });
}

// Admin verification middleware
function verifyAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }
        next();
    });
}

// --- MONGOOSE MODELS ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: String,
    createdAt: { type: Date, default: Date.now }
});

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
    name: String,
    price: Number,
    qty: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customer: {
        name: String,
        email: String,
        address: String
    },
    items: [orderItemSchema],
    total: Number,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// --- CONNECT TO MONGODB ---
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- SIMPLE TEST API ENDPOINT ---
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is running. MongoDB connected: ' + (mongoose.connection.readyState === 1)
    });
});

// --- AUTH ENDPOINTS ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role === 'admin' ? 'admin' : 'user'
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- PRODUCTS CRUD ---
// GET all products (public)
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single product (public)
app.get('/api/products/:id', async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, product: prod });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// CREATE product (admin only)
app.post('/api/products', verifyAdmin, async (req, res) => {
    try {
        const { name, desc, price, stock, image } = req.body;
        if (!name || !price) {
            return res.status(400).json({ success: false, message: 'Name and price are required' });
        }
        const prod = new Product({ name, desc, price, stock, image });
        await prod.save();
        res.status(201).json({ success: true, product: prod });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// UPDATE product (admin only)
app.put('/api/products/:id', verifyAdmin, async (req, res) => {
    try {
        const updates = req.body;
        const prod = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, product: prod });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE product (admin only)
app.delete('/api/products/:id', verifyAdmin, async (req, res) => {
    try {
        const prod = await Product.findByIdAndDelete(req.params.id);
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- ORDERS CRUD ---
// GET all orders (admin only)
app.get('/api/orders', verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single order (auth required)
app.get('/api/orders/:id', verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        // Users can only see their own orders, admins can see all
        if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// CREATE order/checkout (auth required)
app.post('/checkout', verifyToken, async (req, res) => {
    try {
        const { customer, items, total } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        const order = new Order({
            userId: req.user.id,
            customer,
            items,
            total
        });
        await order.save();
        res.status(201).json({ success: true, orderId: order._id, message: 'Order created successfully' });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/orders', verifyToken, async (req, res) => {
    try {
        const { customer, items, total } = req.body;
        const order = new Order({
            userId: req.user.id,
            customer,
            items,
            total
        });
        await order.save();
        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// UPDATE order (admin only)
app.put('/api/orders/:id', verifyAdmin, async (req, res) => {
    try {
        const updates = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE order (admin only)
app.delete('/api/orders/:id', verifyAdmin, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- SERVER START ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✅ Also accessible at http://192.168.1.12:${PORT}`);
    console.log(`API ready. MongoDB connection state: ${mongoose.connection.readyState}`);
});