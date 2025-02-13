const express = require('express');
const authenticate = require('../middleware/authenticate');
const lobbyRoutes = require('./lobby');
const roomRoutes = require('./chatRoom');
const authRoutes = require('./auth');
const friendRoutes = require('./friend');
const achievementRoutes = require('./achievement');
const sessionRoutes = require('./session');
const messageRoutes = require('./postmessage'); // Mesaj rotalarını ekle

const router = express.Router();

router.use('/', authRoutes);
router.use('/lobby', lobbyRoutes);
router.use('/friends', friendRoutes);
router.use('/achievements', achievementRoutes);
router.use('/session', sessionRoutes);
router.use('/rooms', roomRoutes);
router.use('/postmessages', messageRoutes);

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;