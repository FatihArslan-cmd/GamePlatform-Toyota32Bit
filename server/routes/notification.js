const express = require('express');
const router = express.Router();

const { saveToken, sendTestNotification } = require('../controller/notificationController'); // notificationController.js dosyanızın yolu

router.post('/save-token', saveToken);

router.post('/send-test', sendTestNotification);

module.exports = router;