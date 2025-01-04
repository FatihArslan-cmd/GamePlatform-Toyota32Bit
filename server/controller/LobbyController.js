const { createLobby, joinLobby, leaveLobby, deleteLobby, getLobbies } = require('../memory/lobbyStore');

const createLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;
    const { lobbyName, maxCapacity } = req.body;

    if (!lobbyName) {
      return res.status(400).json({ message: 'Lobby name is required' });
    }

    const lobby = createLobby(userId, lobbyName, maxCapacity);
    res.status(201).json({ message: 'Lobby created successfully', lobby });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const joinLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;
    const { lobbyName } = req.body;

    if (!lobbyName) {
      return res.status(400).json({ message: 'Lobby name is required' });
    }

    const lobby = joinLobby(userId, lobbyName);
    res.status(200).json({ message: 'Joined lobby successfully', lobby });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const leaveLobbyHandler = (req, res) => {
  try {
    const userId = req.user.id;

    const lobby = leaveLobby(userId);
    res.status(200).json({ message: 'Left lobby successfully', lobby });
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

const listLobbiesHandler = (req, res) => {
  try {
    const lobbies = getLobbies();
    res.status(200).json({ lobbies });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createLobbyHandler,
  joinLobbyHandler,
  leaveLobbyHandler,
  deleteLobbyHandler,
  listLobbiesHandler,
};
