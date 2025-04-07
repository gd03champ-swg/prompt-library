const express = require('express');
const cors = require('cors');
const promptRoutes = require('./routes/promptRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/prompts', promptRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Prompt Library API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = app;
