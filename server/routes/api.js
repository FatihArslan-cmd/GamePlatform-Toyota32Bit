const express = require('express');
const { login, refreshAccessToken } = require('../controller/authController');
const { generateFriendCode, addFriend, getUserFriends, removeFriend } = require('../controller/friendController');
const authenticate = require('../middleware/authenticate');
const lobbyRoutes = require('./lobby');

const router = express.Router();

router.post('/login', login);
router.use('/lobby', lobbyRoutes);
router.post('/refresh-token', refreshAccessToken);
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
router.get('/messages', (req, res) => {
    if (!req.session.messages) {
        return res.json([]);
    }
    res.json(req.session.messages);
});

router.post('/generate-friend-code', authenticate, generateFriendCode);
router.post('/add-friend', authenticate, addFriend);
router.get('/friends', authenticate, getUserFriends);
router.delete('/remove-friend/:targetUserId', authenticate, removeFriend);

module.exports = router;