const jwt = require('jsonwebtoken');
const { sessionStore } = require('../config/sessionConfig');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username === 'username' && password === 'password') {
      const userId = 123;
      const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

      sessionStore.set(userId, token, (err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Login successful', token });
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Unexpected error during login:', error);
    res.status(500).json({ message: 'Unexpected server error' });
  }
};

module.exports = { login };
