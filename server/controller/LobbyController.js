const lobbyStore = require('../memory/lobbyStore');

const createLobbyHandler = (req, res) => {
    const userId = req.user.id;
    const { lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate } = req.body;

    if (!lobbyName) {
        return res.status(400).json({ message: 'Lobby name is required' });
    }

    if (!lobbyType) {
        return res.status(400).json({ message: 'Lobby type is required' });
    }

    lobbyStore.createLobby(userId, lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate, (err, lobby) => {
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

    lobbyStore.joinLobby(userId, code, password, (err, lobby) => {
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
        if(success) {
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

module.exports = {
    createLobbyHandler,
    joinLobbyHandler,
    leaveLobbyHandler,
    deleteLobbyHandler,
    updateLobbyHandler,
    listLobbiesHandler,
};