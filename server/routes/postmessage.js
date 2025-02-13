const express = require('express');
const {
    createMessageHandler,
    getMessageHandler,
    deleteMessageHandler
} = require('../controller/postMessageController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, createMessageHandler);
router.get('/', authenticate, getMessageHandler);
router.delete('/:id', authenticate, deleteMessageHandler);

module.exports = router;