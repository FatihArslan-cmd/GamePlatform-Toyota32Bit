const express = require('express');
const { login, refreshAccessToken } = require('../controller/authController');
const { generateFriendCode, addFriend, getUserFriends, removeFriend } = require('../controller/friendController');
const { getUserAchievements, updateAchievement,getUserOwnedAchievements } = require('../controller/achievementController');
const authenticate = require('../middleware/authenticate');
const lobbyRoutes = require('./lobby');


const router = express.Router();

router.post('/login', login);
router.use('/lobby', lobbyRoutes);
router.post('/refresh-token', refreshAccessToken);

//Kimlik Doğrulamasının oldugu alan
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

//Mesajları getirme session bazlı
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


// Başarım uç noktaları
router.get('/achievements', authenticate, getUserAchievements);
router.get('/achievements/owned', authenticate, getUserOwnedAchievements);
router.post('/achievements', authenticate, updateAchievement);

module.exports = router;