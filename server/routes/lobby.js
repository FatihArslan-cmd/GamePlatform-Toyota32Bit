const express = require('express');
const {
  createLobbyHandler,
  joinLobbyHandler,
  leaveLobbyHandler,
  deleteLobbyHandler,
  listLobbiesHandler,
  updateLobbyHandler,
  getUserLobbyHandler
} = require('../controller/LobbyController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, createLobbyHandler);
router.post('/join', authenticate, joinLobbyHandler);
router.put('/update', authenticate, updateLobbyHandler);
router.post('/leave', authenticate, leaveLobbyHandler);
router.delete('/delete', authenticate, deleteLobbyHandler);
router.get('/list', authenticate, listLobbiesHandler);
router.get('/listUserLobby', authenticate, getUserLobbyHandler);

module.exports = router;

