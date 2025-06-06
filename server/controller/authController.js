const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sessionStore } = require('../config/sessionConfig');
const users = require('../utils/users');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const HMAC_SECRET = process.env.HMAC_SECRET;

const login = (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = users[username]; 
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const userId = user.id;
      req.session.userId = userId;


      const accessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '12h' });

      const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET_KEY, { expiresIn: '29d' });

      const userInfo = JSON.stringify({ id: userId });
      const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

      sessionStore.set(userId, refreshToken, (err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true, 
          secure: true,   
          sameSite: 'Strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({
          message: 'Login successful',
          accessToken,
          refreshToken,
          encryptedInfo: hashedInfo,
          profilePhoto: user.profilePhoto,
        });
      });
    } catch (error) {
      console.error('Unexpected error during login:', error);
      res.status(500).json({ message: 'Unexpected server error' });
    }
  };

  const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Invalid refresh token:', err);
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
      }

      const userId = decoded.id;

      sessionStore.get(userId, (err, storedRefreshToken) => {
        if (err) {
          console.error('Error fetching session:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
          console.log('Stored refresh token:', storedRefreshToken);
          console.log('Received refresh token:', refreshToken);
          return res.status(401).json({ message: 'Refresh token does not match or expired' });
        }

        const newAccessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '12h' });

        const user = Object.values(users).find(u => u.id === userId); 
        if (!user) {
          return res.status(404).json({ message: 'User not found' }); 
        }

        const userInfo = JSON.stringify({ id: userId });
        const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

        let username = null;
        for (const key in users) {
          if (users[key].id === userId) {
            username = key;
            break;
          }
        }

        res.status(200).json({
          message: 'Access token refreshed successfully',
          accessToken: newAccessToken,
          encryptedInfo: hashedInfo,
          profilePhoto: user.profilePhoto,
          username: username,
        });
      });
    });
  };

module.exports = { login, refreshAccessToken };