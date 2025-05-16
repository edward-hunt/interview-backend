const { pool } = require('../config/postgresql');

// INTERVIEW TASK 3: Implement these user-related endpoints
// These are currently just stubs that return empty responses

const getAllUsers = async (req, res) => {
  try {
    // TODO: Implement getting all users from PostgreSQL
    // HINT: Use pool.query() to execute SQL
    // Expected SQL: SELECT * FROM users ORDER BY created_at DESC
    
    res.json({ message: 'TODO: Implement getAllUsers' });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = async (req, res) => {
  try {
    // TODO: Implement creating a new user in PostgreSQL
    // HINT: Extract name and email from req.body
    // Expected SQL: INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *
    
    res.json({ message: 'TODO: Implement createUser' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  getAllUsers,
  createUser
};