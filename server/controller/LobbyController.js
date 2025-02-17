const lobbyStore = require('../memory/lobbyStore'); // Doğru yolu kullandığınızdan emin olun

const createLobbyHandler = (req, res) => {
  const userId = req.user.id;
  const { lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate, hasPassword } = req.body; // hasPassword eklendi

  if (!lobbyName) {
      return res.status(400).json({ message: 'Lobby name is required' });
  }

  if (!lobbyType) {
      return res.status(400).json({ message: 'Lobby type is required' });
  }

  if (maxCapacity === undefined || maxCapacity === null) {
      return res.status(400).json({ message: 'Max capacity is required' });
  }

  if (typeof maxCapacity !== 'number' || isNaN(maxCapacity)) {
      return res.status(400).json({ message: 'Max capacity must be a number' });
  }

  if (maxCapacity <= 0) {
      return res.status(400).json({ message: 'Max capacity must be a positive number' });
  }

  lobbyStore.createLobby(userId, lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate, hasPassword, (err, lobby) => { // hasPassword parametresi eklendi
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ message: 'Lobby created successfully', lobby });
  });
};

const joinLobbyHandler = (req, res) => {
  const userId = req.user.id;
  const { code, password } = req.body;

  if (!code) {
      return res.status(400).json({ message: 'Lobby code is required' });
  }

  lobbyStore.joinLobby(userId, code, { password, isInvite: false }, (err, lobby) => {
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      res.status(200).json({ message: 'Joined lobby successfully', lobby });
  });
};
const leaveLobbyHandler = (req, res) => {
    const userId = req.user.id;

    lobbyStore.leaveLobby(userId, (err, lobby) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const isOwnerLeaving = lobby.ownerId === userId;
        const timeoutMessage = isOwnerLeaving
            ? 'Owner has left the lobby. The lobby will be deleted after 8 hours if inactive.'
            : null;

        const sanitizedLobby = { ...lobby };
        delete sanitizedLobby.timeout;

        res.status(200).json({
            message: 'Left lobby successfully',
            lobby: sanitizedLobby,
            timeoutMessage,
        });
    });
};


const deleteLobbyHandler = (req, res) => {
    const userId = req.user.id;

    lobbyStore.deleteLobby(userId, (err, success) => { // success parametresi eklendi
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (success) {
            res.status(200).json({ message: 'Lobby deleted successfully' });
        } else {
            res.status(500).json({ message: 'Lobby deletion failed' }); // veya başka bir hata mesajı
        }

    });
};

const updateLobbyHandler = (req, res) => {
    const userId = req.user.id;
    const updates = req.body;

    lobbyStore.updateLobby(userId, updates, (err, lobby) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'Lobby updated successfully', lobby });
    });
};
const getUserLobbyHandler = (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    lobbyStore.getUserLobby(userId, (err, lobby) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ lobby: lobby }); // Respond with the lobby or null
    });
};
const listLobbiesHandler = (req, res) => {
    lobbyStore.getLobbies((err, lobbies) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const sanitizedLobbies = lobbies.map((lobby) => {
            const { password, ...rest } = lobby;
            return rest;
        });

        res.status(200).json({ lobbies: sanitizedLobbies });
    });
};

const inviteFriendToLobbyHandler = (req, res) => {
  const inviterUserId = req.user.id;
  const { invitedUserId, lobbyCode } = req.body;

  if (!invitedUserId || !lobbyCode) {
      return res.status(400).json({ message: 'Invited user ID and lobby code are required' });
  }

  lobbyStore.getUserLobby(invitedUserId, (err) => {
      if (err) {
          console.error("Error getting invited user's lobby:", err);
          return res.status(500).json({ message: 'Internal server error' });
      }


      lobbyStore.sendLobbyInvite(inviterUserId, invitedUserId, lobbyCode, (err, invitation) => {
          if (err) {
              return res.status(400).json({ message: err.message });
          }
          res.status(200).json({ message: 'Lobby invitation sent successfully', invitation });
      });
  });
};


const getLobbyInvitesHandler = (req, res) => {
  const userId = req.user.id;

  lobbyStore.getLobbyInvitesForUser(userId, (err, invitations) => {
      if (err) {
          return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ invitations });
  });
};

const acceptLobbyInviteHandler = (req, res) => {
  const userId = req.user.id;
  const { lobbyCode } = req.body;

  if (!lobbyCode) {
      return res.status(400).json({ message: 'Lobby code is required to accept invitation' });
  }

  lobbyStore.acceptLobbyInvite(userId, lobbyCode, (err, lobby) => {
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      res.status(200).json({ message: 'Lobby invitation accepted. Joined lobby successfully', lobby });
  });
};


const rejectLobbyInviteHandler = (req, res) => {
  const userId = req.user.id;
  const { lobbyCode } = req.body;

  if (!lobbyCode) {
      return res.status(400).json({ message: 'Lobby code is required to reject invitation' });
  }

  lobbyStore.rejectLobbyInvite(userId, lobbyCode, (err, result) => {
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      res.status(200).json({ message: 'Lobby invitation rejected' });
  });
};


module.exports = {
    createLobbyHandler,
    joinLobbyHandler,
    leaveLobbyHandler,
    deleteLobbyHandler,
    updateLobbyHandler,
    listLobbiesHandler,
    getUserLobbyHandler,
    inviteFriendToLobbyHandler,
    getLobbyInvitesHandler,
    acceptLobbyInviteHandler,
    rejectLobbyInviteHandler
};
