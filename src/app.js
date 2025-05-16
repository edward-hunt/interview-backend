
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
console.log(process.env.MONGODB_URI)
// Database connections
const connectMongoDB = require('./config/mongodb');
const {connectPostgreSQL} = require('./config/postgresql');

// Routes
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Connect to databases
connectMongoDB();
connectPostgreSQL();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;