const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS — allow Angular dev server
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Example route (can be deleted later)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product routes (for example)
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
