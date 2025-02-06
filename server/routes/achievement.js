const express = require('express');
const { getUserAchievements, updateAchievement, getUserOwnedAchievements } = require('../controller/achievementController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticate, getUserAchievements);
router.get('/owned', authenticate, getUserOwnedAchievements);
router.post('/', authenticate, updateAchievement);

module.exports = router;