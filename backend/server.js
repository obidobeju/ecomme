const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8000;
const JWT_SECRET = 'YOUR_SUPER_SECRET_KEY';

// --- MONGODB CONNECTION ---
// server.js

// Make sure the hostname matches what Atlas displays precisely.
const MONGODB_URI = 'mongodb+srv://bejuuuu:OBIDO01@cluster0.r6i7ise.mongodb.net/Writes=true&w=majority'; 
// Should be one continuous, correctly spelled string.

mongoose.connect(MONGODB_URI)
// ...
mongoose.connect(MONGODB_URI)
    .then(() => console.log('🟢 MongoDB connected successfully!'))
    .catch(err => console.error('🔴 MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// --- MONGODB SCHEMAS ---

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        qty: Number
    }],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// --- ORDER PROCESSING LOGIC ---

let orderCounter = 1000;

app.post('/checkout', async (req, res) => {
    const orderData = req.body;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Cart is empty or invalid data provided.'
        });
    }

    orderCounter++;
    const newOrderId = `ORD-${orderCounter}`;

    const newOrder = new Order({
        orderId: newOrderId,
        customer: orderData.customer,
        items: orderData.items,
        total: orderData.total,
    });

    try {
        await newOrder.save();

        console.log(`\n--- RECEIVED & SAVED NEW ORDER (${newOrderId}) ---`);
        console.log(`Customer: ${orderData.customer.name}`);
        console.log(`Total: ₱${orderData.total.toFixed(2)}`);
        console.log('-------------------------------------\n');

        res.json({
            success: true,
            orderId: newOrderId,
            message: 'Order processed and saved successfully.'
        });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({
            success: false,
            message: 'Order processing failed due to a database error.'
        });
    }
});

// --- REGISTRATION ROUTE ---

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        console.log(`✨ New user registered: ${username} (${email})`);
        res.status(201).json({ 
            success: true, 
            message: 'Registration successful! You can now log in.' 
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// --- LOGIN ROUTE ---

app.post('/api/login', async (req, res) => {
    const { username_or_email, password } = req.body;

    if (!username_or_email || !password) {
        return res.status(400).json({ message: 'Please enter both credentials.' });
    }

    try {
        const user = await User.findOne({ 
            $or: [{ username: username_or_email }, { email: username_or_email }] 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        console.log(`🔑 User logged in: ${user.username}`);

        res.json({
            success: true,
            message: 'Login successful!',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// --- SERVER START ---

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`Backend ready to receive requests.`);
});