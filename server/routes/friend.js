const express = require('express');
const { generateFriendCode, addFriend, getUserFriends, removeFriend } = require('../controller/friendController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/generate-friend-code', authenticate, generateFriendCode);
router.post('/add-friend', authenticate, addFriend);
router.get('/friends', authenticate, getUserFriends);
router.delete('/remove-friend/:targetUserId', authenticate, removeFriend);

module.exports = router;