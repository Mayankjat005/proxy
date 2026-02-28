const express = require('express');
const axios = require('axios');
const app = express();

// Common Headers for request (Taaki unhe lage browser se request aa rahi hai)
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://peachify.top/'
};

async function proxyStream(url, res) {
    try {
        const response = await axios.get(url, { headers: HEADERS });
        
        // Sabse important step: Security headers ko remove karna
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        
        // Content-Type set karna taaki browser HTML render kare
        res.setHeader('Content-Type', 'text/html');
        
        // Response ko user ko bhej dena
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching content: " + error.message);
    }
}

// 1. Movie Proxy
app.get('/watch/movie/:id', async (req, res) => {
    const targetUrl = `https://peachify.top/?type=movie&id=${req.params.id}`;
    await proxyStream(targetUrl, res);
});

// 2. TV Series Proxy
app.get('/watch/tv/:id/:s/:e', async (req, res) => {
    const { id, s, e } = req.params;
    const targetUrl = `https://peachify.top/?type=tv&id=${id}&s=${s}&e=${e}`;
    await proxyStream(targetUrl, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Advanced Proxy running on port ${PORT}`));

module.exports = app;
