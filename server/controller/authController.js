const jwt = require('jsonwebtoken');
const { sessionStore } = require('../config/sessionConfig');

const SECRET_KEY = 'your-jwt-secret-key';

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'username' && password === 'password') {
    const userId = 123;
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

    sessionStore.set(userId, token, (err) => {
      if (err) return res.status(500).json({ message: 'Session error' });
      res.json({ message: 'Login successful', token });
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { login };
