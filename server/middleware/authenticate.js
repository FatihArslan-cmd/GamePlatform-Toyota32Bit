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

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded.id;

    // Create a hashed version of the user information
    const userInfo = JSON.stringify({ id: userId });
    const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

    // Attach user details to the request object
    req.user = { id: userId, encryptedInfo: hashedInfo };
    next();
  });
};

module.exports = authenticate;
