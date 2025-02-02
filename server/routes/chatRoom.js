const express = require('express');
const {
  createRoomHandler,
  getRoomHandler,
  getAllRoomsHandler,
  joinRoomHandler,
  leaveRoomHandler,
  deleteRoomHandler
} = require('../controller/roomController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, createRoomHandler);
router.get('/', authenticate, getAllRoomsHandler);
router.get('/:roomId', authenticate, getRoomHandler);
router.post('/:roomId/join', authenticate, joinRoomHandler);
router.post('/:roomId/leave', authenticate, leaveRoomHandler);
router.delete('/:roomId', authenticate, deleteRoomHandler);

module.exports = router;