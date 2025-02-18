const express = require('express');
const { login, refreshAccessToken } = require('../controller/authController');
const {sendVerificationCode,rateLimitMiddleware} = require('../controller/sendVerificationCode');
const router = express.Router();

router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.post('/send-verification-code',rateLimitMiddleware, sendVerificationCode);

module.exports = router;