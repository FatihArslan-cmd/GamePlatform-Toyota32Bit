const express = require('express');
const { login,refreshAccessToken  } = require('../controller/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
