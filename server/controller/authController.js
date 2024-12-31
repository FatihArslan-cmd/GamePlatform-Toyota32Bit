const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sessionStore } = require('../config/sessionConfig');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const HMAC_SECRET = process.env.HMAC_SECRET;

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Dummy user validation
    if (username === 'fatih' && password === '123456') {
      const userId = 123;
      const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

      const userInfo = JSON.stringify({ id: userId });
      const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

      sessionStore.set(userId, token, (err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Send encrypted user info to frontend
        res.status(200).json({ message: 'Login successful', token, encryptedInfo: hashedInfo });
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
