const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const connectDB = require('./config/database');
connectDB();

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
