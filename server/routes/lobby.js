const express = require('express');
const {
  createLobbyHandler,
  joinLobbyHandler,
  leaveLobbyHandler,
  deleteLobbyHandler,
  listLobbiesHandler,
  updateLobbyHandler,
  getUserLobbyHandler,
  inviteFriendToLobbyHandler,
  getLobbyInvitesHandler,
  acceptLobbyInviteHandler,
  rejectLobbyInviteHandler,
  drawNumberHandler,
  getLobbyInvitationCountHandler,
  startGameHandler,
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

router.post('/start-game', authenticate, startGameHandler);
router.post('/invite-friend', authenticate, inviteFriendToLobbyHandler);
router.get('/invitations', authenticate, getLobbyInvitesHandler);
router.post('/invitations/accept', authenticate, acceptLobbyInviteHandler);
router.post('/invitations/reject', authenticate, rejectLobbyInviteHandler);
router.get('/invitations/count', authenticate, getLobbyInvitationCountHandler);

router.post('/lobbies/:lobbyCode/draw-number', authenticate, drawNumberHandler); // Yeni eklenen route

module.exports = router;