const express = require('express');
const {
  createLobbyHandler,
  joinLobbyHandler,
  leaveLobbyHandler,
  deleteLobbyHandler,
  listLobbiesHandler,
} = require('../controller/LobbyController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, createLobbyHandler);
router.post('/join', authenticate, joinLobbyHandler);
router.post('/leave', authenticate, leaveLobbyHandler);
router.delete('/delete', authenticate, deleteLobbyHandler);
router.get('/list', authenticate, listLobbiesHandler);

module.exports = router;
