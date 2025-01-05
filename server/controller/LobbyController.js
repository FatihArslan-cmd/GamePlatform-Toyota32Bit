const { createLobby, joinLobby, leaveLobby, deleteLobby, updateLobby, getLobbies } = require('../memory/lobbyStore');

const createLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;
    const { lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate } = req.body;

    if (!lobbyName) {
      return res.status(400).json({ message: 'Lobby name is required' });
    }

    if (!lobbyType) {
      return res.status(400).json({ message: 'Lobby type is required' });
    }

    const lobby = createLobby(userId, lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate);
    res.status(201).json({ message: 'Lobby created successfully', lobby });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const joinLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;
    const { lobbyName, password } = req.body;

    if (!lobbyName) {
      return res.status(400).json({ message: 'Lobby name is required' });
    }

    const lobby = joinLobby(userId, lobbyName, password);
    res.status(200).json({ message: 'Joined lobby successfully', lobby });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const leaveLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;

    const lobby = leaveLobby(userId);

    const isOwnerLeaving = lobby.ownerId === userId;
    const timeoutMessage = isOwnerLeaving
      ? 'Owner has left the lobby. The lobby will be deleted after 8 hours unless the owner rejoins.'
      : null;

    res.status(200).json({
      message: 'Left lobby successfully',
      lobby,
      timeoutMessage,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;

    deleteLobby(userId);
    res.status(200).json({ message: 'Lobby deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const lobby = updateLobby(userId, updates);
    res.status(200).json({ message: 'Lobby updated successfully', lobby });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listLobbiesHandler = (req, res) => {
  try {
    const lobbies = getLobbies();

    const enrichedLobbies = lobbies.map((lobby) => ({
      ...lobby,
      timeoutActive: !!lobby.timeout,
      lastOwnerLeave: lobby.lastOwnerLeave,
    }));

    res.status(200).json({ lobbies: enrichedLobbies });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createLobbyHandler,
  joinLobbyHandler,
  leaveLobbyHandler,
  deleteLobbyHandler,
  updateLobbyHandler,
  listLobbiesHandler,
};