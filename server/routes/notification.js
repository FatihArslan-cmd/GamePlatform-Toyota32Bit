const express = require('express');
const router = express.Router();

const {
  saveToken,
  sendNotificationToSpecificToken,
  getAllServerTokens,
  sendTestNotificationToAll,
  removeToken
} = require('../controller/notificationController');

router.post('/save-token', saveToken);

router.post('/send-to-token', sendNotificationToSpecificToken);

router.get('/get-all-server-tokens', getAllServerTokens);

router.post('/send-test-all', sendTestNotificationToAll);

router.post('/remove-token', removeToken);

module.exports = router;