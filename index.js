const express = require('express');
const app = express();

// Root route (Check karne ke liye ki server chal raha hai)
app.get('/', (req, res) => {
    res.send('Movie Proxy API is Running! 🚀');
});

// 1. Movie Proxy Route
// Example: /stream/movie/550
app.get('/stream/movie/:id', (req, res) => {
    const tmdbId = req.params.id;
    if (!tmdbId) return res.status(400).send("TMDB ID missing");
    
    const targetUrl = `https://peachify.top/?type=movie&id=${tmdbId}`;
    res.redirect(targetUrl);
});

// 2. TV Series Proxy Route
// Example: /stream/tv/1399/1/1
app.get('/stream/tv/:id/:s/:e', (req, res) => {
    const { id, s, e } = req.params;
    if (!id || !s || !e) return res.status(400).send("Params missing");

    const targetUrl = `https://peachify.top/?type=tv&id=${id}&s=${s}&e=${e}`;
    res.redirect(targetUrl);
});

// Port setting (Vercel/Render ke liye zaroori hai)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app; // Vercel support ke liye
