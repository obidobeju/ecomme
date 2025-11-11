const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- SIMPLE TEST API ENDPOINT ---
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API is running! Frontend-only setup ready.' 
    });
});

// --- MOCK CHECKOUT ENDPOINT (NO DATABASE) ---
let orderCounter = 1000;

app.post('/checkout', (req, res) => {
    const orderData = req.body;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Cart is empty or invalid data provided.'
        });
    }

    orderCounter++;
    const newOrderId = `ORD-${orderCounter}`;

    console.log(`\n--- MOCK ORDER RECEIVED (${newOrderId}) ---`);
    console.log(`Customer: ${orderData.customer.name}`);
    console.log(`Email: ${orderData.customer.email}`);
    console.log(`Address: ${orderData.customer.address}`);
    console.log(`Total: ₱${orderData.total.toFixed(2)}`);
    console.log(`Items: ${orderData.items.length}`);
    console.log('-------------------------------------\n');

    res.json({
        success: true,
        orderId: newOrderId,
        message: 'Order processed successfully (mock).'
    });
});

// --- SERVER START ---

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`Frontend-only API ready to receive requests.`);
});