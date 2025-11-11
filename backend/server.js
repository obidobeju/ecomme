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

// --- SERVER START ---

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`Frontend-only API ready to receive requests.`);
});