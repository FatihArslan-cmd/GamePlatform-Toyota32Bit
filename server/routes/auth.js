const express = require('express');
const { login, refreshAccessToken,updateUser } = require('../controller/authController');
const router = express.Router();

router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;