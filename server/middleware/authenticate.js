const jwt = require('jsonwebtoken');
const { sessionStore } = require('../config/sessionConfig');
require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const userId = decoded.id;

    sessionStore.get(userId, (err, storedToken) => {
      if (err || !storedToken || storedToken !== token) {
        return res.status(401).json({ message: 'Session expired or invalid' });
      }

      req.user = { id: userId };
      next();
    });
  });
};

module.exports = authenticate;
