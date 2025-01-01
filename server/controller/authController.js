const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sessionStore } = require('../config/sessionConfig');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY; // Refresh token için farklı bir secret key
const HMAC_SECRET = process.env.HMAC_SECRET;

// Uygulamada cookie-parser'ı kullanmanız gerekiyor
// Örneğin: app.use(cookieParser());

// Login işlemi
const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Dummy user validation
    if (username === 'fatih' && password === '123456') {
      const userId = 123;

      // Access token (1 saat geçerli)
      const accessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

      // Refresh token (7 gün geçerli)
      const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET_KEY, { expiresIn: '29d' });

      // Kullanıcı bilgilerini hashle
      const userInfo = JSON.stringify({ id: userId });
      const hashedInfo = crypto.createHmac('sha256', HMAC_SECRET).update(userInfo).digest('hex');

      // Session'a refresh token'ı kaydet
      sessionStore.set(userId, refreshToken, (err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Refresh token'ı HTTP-only cookie olarak ayarla
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true, // İstemci tarafı JavaScript erişimini engeller
          secure: true,   // Yalnızca HTTPS üzerinden gönderilir
          sameSite: 'Strict', // CSRF saldırılarına karşı koruma
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün (milisaniye cinsinden)
        });

        // Access token ve diğer bilgileri frontend'e gönder
        res.status(200).json({
          message: 'Login successful',
          accessToken,
          encryptedInfo: hashedInfo,
        });
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Unexpected error during login:', error);
    res.status(500).json({ message: 'Unexpected server error' });
  }
};

const refreshAccessToken = (req, res) => {
  // Refresh token'ı cookie'den al
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Invalid refresh token:', err);
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const userId = decoded.id;

    sessionStore.get(userId, (err, storedRefreshToken) => {
      if (err) {
        console.error('Error getting session:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
        console.log('Stored refresh token:', storedRefreshToken);
        console.log('Received refresh token:', refreshToken);
        return res.status(401).json({ message: 'Refresh token expired or invalid' });
      }

      // Yeni access token oluştur
      const newAccessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ accessToken: newAccessToken });
    });
  });
};

module.exports = { login, refreshAccessToken };