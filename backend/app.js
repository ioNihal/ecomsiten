const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const cors = require('cors'); // Import cors
require('dotenv').config();

const mongoUri = process.env.CONN_STRING;

const app = express();

// Enable CORS for all requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// MongoDB Connection 
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);

// Example Protected Route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, User ID: ${req.user} User Name: ${req.name}` });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
