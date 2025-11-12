const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// --- CONFIG ---
// Use environment variable when available, otherwise use the connection string provided.
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://bejuuuu:OBIDO01@cluster0.r6i7ise.mongodb.net/yawa?retryWrites=true&w=majority';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MONGOOSE MODELS ---
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

// --- PRODUCTS CRUD ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, product: prod });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, desc, price, stock, image } = req.body;
        const prod = new Product({ name, desc, price, stock, image });
        await prod.save();
        res.status(201).json({ success: true, product: prod });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updates = req.body;
        const prod = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, product: prod });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const prod = await Product.findByIdAndDelete(req.params.id);
        if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- ORDERS CRUD ---
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/checkout', async (req, res) => {
    // Create order (checkout)
    try {
        const orderData = req.body;
        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty or invalid data provided.' });
        }

        const order = new Order({
            customer: orderData.customer,
            items: orderData.items,
            total: orderData.total
        });

        await order.save();

        res.status(201).json({ success: true, orderId: order._id, message: 'Order saved to database.' });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const order = new Order(orderData);
        await order.save();
        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const updates = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`API ready. MongoDB connection state: ${mongoose.connection.readyState}`);
});