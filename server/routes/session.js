const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/messages', authenticate, (req, res) => {
    if (!req.session.messages) {
        return res.json([]);
    }
    res.json(req.session.messages);
});

router.get('/joined-rooms', authenticate, (req, res) => {
    if(!req.session.joinedRooms){
        return res.json([])
    }
    res.json(Array.from(req.session.joinedRooms))
});
module.exports = router;