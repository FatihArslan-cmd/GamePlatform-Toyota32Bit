const lobbyManager = require('../memory/LobbyStore/lobbyManager'); // Adjust path if necessary
const lobbyInvitationManager = require('../memory/LobbyStore/lobbyInvitationManager'); // Adjust path if necessary
const lobbyGameManager = require('../memory/LobbyStore/lobbyGameManager'); // Adjust path if necessary
const { getUserDetails } = require('../utils/getUserDetails'); // Import getUserDetails function using destructuring
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

    lobbyManager.createLobby(userId, lobbyName, lobbyType, maxCapacity, gameName, password, startDate, endDate, hasPassword, (err, lobby) => { // hasPassword parametresi eklendi
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ message: 'Lobby created successfully', lobby });
    });
};

const joinLobbyHandler = (req, res) => {
    const userId = req.user.id;
    const { code, password } = req.body;
    const websocketManager = req.app.get('WebsocketManager'); // Get WebSocket manager

    if (!code) {
        return res.status(400).json({ message: 'Lobby code is required' });
    }

    lobbyManager.joinLobby(userId, code, { password, isInvite: false }, (err, lobby) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        // Broadcast user joined message - CORRECTED to use 'user-connected'
        if (websocketManager) {
            const userDetails = getUserDetails(userId); // Get user details to get username
            const username = userDetails ? userDetails.username : 'Bilinmeyen Kullanıcı';
            websocketManager.broadcastBingoGameMessage(code, { type: 'user-connected', userId: userId, username: username }); // Broadcast join event - using 'user-connected' now
        } else {
            console.error("websocketManager is not defined in app.js, WebSocket broadcast will not work.");
        }

        res.status(200).json({ message: 'Joined lobby successfully', lobby });
    });
};

const leaveLobbyHandler = (req, res) => {
    const userId = req.user.id;
    const websocketManager = req.app.get('WebsocketManager'); // Get WebSocket manager

    lobbyManager.leaveLobby(userId, (err, lobby) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        // Broadcast user left message - Let's use 'user-disconnected' to be consistent with WebSocket close event
        if (websocketManager && lobby) { // Check if lobby exists before broadcasting
            const userDetails = getUserDetails(userId); // Get user details to get username
            const username = userDetails ? userDetails.username : 'Bilinmeyen Kullanıcı';
            websocketManager.broadcastBingoGameMessage(lobby.code, { type: 'user-disconnected', userId: userId, username: username }); // Broadcast leave event - using 'user-disconnected'
        } else {
            console.error("websocketManager is not defined in app.js or lobby is null, WebSocket broadcast will not work.");
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

    lobbyManager.deleteLobby(userId, (err, success) => { // success parametresi eklendi
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

    lobbyManager.updateLobby(userId, updates, (err, lobby) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'Lobby updated successfully', lobby });
    });
};

const getUserLobbyHandler = (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    lobbyManager.getUserLobby(userId, (err, lobby) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ lobby: lobby }); // Respond with the lobby or null
    });
};

const listLobbiesHandler = (req, res) => {
    lobbyManager.getLobbies((err, lobbies) => {
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

    lobbyManager.getUserLobby(invitedUserId, (err, existingLobby) => { // Check if invited user is already in a lobby
        if (err) {
            console.error("Error getting invited user's lobby:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (existingLobby) {
            return res.status(400).json({ message: 'Invited user is already in a lobby' });
        }

        lobbyInvitationManager.sendLobbyInvite(inviterUserId, invitedUserId, lobbyCode, (err, invitation) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).json({ message: 'Lobby invitation sent successfully', invitation });
        });
    });
};


const getLobbyInvitesHandler = (req, res) => {
    const userId = req.user.id;

    lobbyInvitationManager.getLobbyInvitesForUser(userId, (err, invitations) => {
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

    lobbyInvitationManager.acceptLobbyInvite(userId, lobbyCode, (err, lobby) => {
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

    lobbyInvitationManager.rejectLobbyInvite(userId, lobbyCode, (err, result) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'Lobby invitation rejected' });
    });
};

const getLobbyInvitationCountHandler = (req, res) => {
    const userId = req.user.id;

    lobbyInvitationManager.getInvitationCountForUser(userId, (err, invitationCount) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ invitationCount });
    });
};

const startGameHandler = (req, res) => {
    const userId = req.user.id;

    lobbyManager.getUserLobby(userId, (err, lobby) => { // Still using lobbyManager to get user lobby
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!lobby) {
            return res.status(404).json({ message: 'It is an obligation to have a lobby to start' });
        }

        if (lobby.ownerId !== userId) {
            return res.status(403).json({ message: 'Only the lobby owner can start the game' });
        }

        if (lobby.gameStarted) {
            return res.status(400).json({ message: 'Game already started' });
        }

        lobbyGameManager.startGame(lobby.code, (err, updatedLobby) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const websocketManager = req.app.get('WebsocketManager');
            if (websocketManager) {
                websocketManager.broadcastBingoGameMessage(lobby.code, { type: 'game-started' }); // Call the new method
            } else {
                console.error("websocketManager is not defined in app.js, WebSocket broadcast will not work.");
            }

            res.status(200).json({ message: 'Game started successfully', lobby: updatedLobby });
        });
    });
};

const drawNumberHandler = (req, res) => {
    const userId = req.user.id;
    const lobbyCode = req.params.lobbyCode;
    const websocketManager = req.app.get('WebsocketManager');

    lobbyGameManager.drawNumber(lobbyCode, userId, (err, lobby, drawnNumber) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (websocketManager) {
            websocketManager.broadcastBingoGameMessage(lobbyCode, { type: 'number-drawn', number: drawnNumber, drawnNumbers: lobby.drawnNumbers });
        } else {
            console.error("websocketManager tanımlı değil, WebSocket yayın çalışmayacak.");
        }

        res.status(200).json({ message: 'Sayı çekildi', drawnNumber: drawnNumber, drawnNumbers: lobby.drawnNumbers, lobby });
    });
};

const markNumberHandler = (req, res) => {
    const userId = req.user.id;
    const lobbyCode = req.params.lobbyCode;
    const { number } = req.body; // İşaretlenecek sayıyı body'den alıyoruz
    const websocketManager = req.app.get('WebsocketManager');

    if (typeof number !== 'number') {
        return res.status(400).json({ message: 'Geçersiz sayı formatı' });
    }

    lobbyGameManager.markNumberOnCard(lobbyCode, userId, number, (err, lobby, isBingo, markedNumber, cellPosition) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (websocketManager) {
            websocketManager.broadcastBingoGameMessage(lobbyCode, {
                type: 'number-marked',
                userId: userId,
                number: markedNumber,
                cellPosition: cellPosition,
                markedNumbers: lobby.markedNumbers, // Tüm oyuncuların işaretlediği numaraları yayınla
            });
            if (isBingo) {
                websocketManager.broadcastBingoGameMessage(lobbyCode, { type: 'bingo', userId: userId }); // Bingo mesajını yayınla
            }
        } else {
            console.error("websocketManager tanımlı değil, WebSocket yayın çalışmayacak.");
        }

        res.status(200).json({ message: 'Sayı işaretlendi', isBingo: isBingo, markedNumber: markedNumber, cellPosition: cellPosition });
    });
};

const getGameHistoryHandler = async (req, res) => {
    try {
        const userId = req.user.id; // Kullanıcı kimliğini doğrulanmış istekten al
        lobbyGameManager.getGameHistoryForUser(userId, (err, gameHistory) => {
            if (err) {
                console.error('Failed to get game history:', err);
                return res.status(500).json({ message: 'Oyun geçmişi alınamadı', error: err.message });
            }
            res.status(200).json(gameHistory);
        });
    } catch (error) {
        console.error('Error in getGameHistoryHandler:', error);
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
};
const endGameHandler = (req, res) => {
    const userId = req.user.id;
    const websocketManager = req.app.get('WebsocketManager');

    lobbyManager.getUserLobby(userId, (err, lobby) => { // Kullanıcının lobisini al
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!lobby) {
            return res.status(404).json({ message: 'Kullanıcı bir lobide bulunmuyor' }); // Kullanıcı lobide değilse hata döndür
        }

        if (lobby.ownerId !== userId) {
            return res.status(403).json({ message: 'Sadece oda sahibi oyunu bitirebilir' });
        }

        lobbyGameManager.endGame(lobby.code, userId, (err, updatedLobby) => { // lobby.code kullanılıyor
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (websocketManager) {
                websocketManager.broadcastBingoGameMessage(lobby.code, { type: 'game-ended' });
            } else {
                console.error("websocketManager tanımlı değil, WebSocket yayın çalışmayacak.");
            }

            res.status(200).json({ message: 'Oyun başarıyla bitirildi', lobby: updatedLobby });
        });
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
    rejectLobbyInviteHandler,
    getLobbyInvitationCountHandler,
    startGameHandler,
    drawNumberHandler,
    markNumberHandler,
    getGameHistoryHandler,
    endGameHandler,
};