const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const HMAC_SECRET = process.env.HMAC_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
     if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({
          message: 'Your session has expired. Please log in again.',
          error: 'TokenExpiredError'
          });
     }
          return res.status(401).json({
          message: 'Authentication failed. Please log in again.',
          error: err.message
          });
     }

    const userId = decoded.id;

    const userInfo = JSON.stringify({ id: userId });
    const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

    req.user = { id: userId, encryptedInfo: hashedInfo };
    next();
  });
};

module.exports = authenticate;