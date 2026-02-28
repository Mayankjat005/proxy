const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Movie Proxy Route
// Usage: http://localhost:3000/stream/movie/550
app.get('/stream/movie/:id', (req, res) => {
    const tmdbId = req.params.id;
    if (!tmdbId) return res.status(400).send("TMDB ID is required");
    
    const targetUrl = `https://peachify.top/?type=movie&id=${tmdbId}`;
    
    // Aap yahan redirect kar sakte hain ya page render kar sakte hain
    res.redirect(targetUrl);
});

// 2. TV Series Proxy Route
// Usage: http://localhost:3000/stream/tv/1399/1/1
app.get('/stream/tv/:id/:s/:e', (req, res) => {
    const { id, s, e } = req.params;
    
    if (!id || !s || !e) {
        return res.status(400).send("ID, Season, and Episode are required");
    }

    const targetUrl = `https://peachify.top/?type=tv&id=${id}&s=${s}&e=${e}`;
    res.redirect(targetUrl);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
