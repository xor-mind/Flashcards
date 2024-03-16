const express = require('express');
const path = require('path'); // Node.js module to work with file paths

const flashcardsRoutes = require('./routes/flashcardsRoutes'); // Path to your route module
const categoriesRoutes = require('./routes/categoriesRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));
// Use JSON middleware to automatically parse JSON
// app.use(express.json()); needed for U and P in CRUD, or else the req.body is undefined.

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// mount the flashcardsRoutes router for requests to /api/flashcards'
app.use('/api/flashcards', flashcardsRoutes);

// mount the categoriesRoutes router for requests to /api/categories'
app.use('/api/categories', categoriesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


