const generateTombalaCard = require('../../utils/generateTombalaCard'); // Yeni dosya oluşturulacak
const lobbyManager = require('./lobbyManager'); // Import lobbyManager to use getLobbiesFromSession and saveLobbiesToSession
const { sessionStore } = require('../../config/sessionConfig');

const lobbyGameManager = {
    startGame: (lobbyCode, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (lobby.gameStarted) {
                return callback(new Error('Oyun zaten başladı'));
            }
        
            lobby.gameStarted = true;
            lobby.drawnNumbers = [];
            lobby.currentNumber = null;
            lobby.numberPool = Array.from({ length: 90 }, (_, i) => i + 1);
            lobby.bingoCards = {};
            lobby.markedNumbers = {};

            lobby.members.forEach(member => {
                lobby.bingoCards[member.id] = generateTombalaCard();
                lobby.markedNumbers[member.id] = {};
            });

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },

    drawNumber: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Oyun henüz başlamadı'));
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Sadece oda sahibi sayı çekebilir'));
            }
            if (lobby.numberPool.length === 0) {
                lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Oyunu Kaybetti', (historyErr) => { // Record loss for all users
                    if (historyErr) console.error("Oyun geçmişi kaydetme hatası:", historyErr);
                    lobby.gameStarted = false; // Oyun bitti flag'i ekleyelim.
                    lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                        if (saveErr) return callback(saveErr);
                        callback(new Error('Çekilecek sayı kalmadı'), lobby, null, true); // isGameOver true olarak işaretlendi
                    });
                });
                return; // early return to prevent further processing
            }

            const randomIndex = Math.floor(Math.random() * lobby.numberPool.length);
            const drawnNumber = lobby.numberPool.splice(randomIndex, 1)[0];
            lobby.drawnNumbers.push(drawnNumber);
            lobby.currentNumber = drawnNumber;

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby, drawnNumber, false); // isGameOver false
            });
        });
    },

    markNumberOnCard: (lobbyCode, userId, number, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Oyun henüz başlamadı'));
            }
            if (!lobby.bingoCards[userId]) {
                return callback(new Error('Kullanıcıya ait tombala kartı bulunamadı'));
            }

            const card = lobby.bingoCards[userId];
            let cellPosition = null;

            for (let row = 0; row < card.length; row++) {
                for (let col = 0; col < card[row].length; col++) {
                    if (card[row][col] === number) {
                        cellPosition = `${row}-${col}`;
                        break;
                    }
                }
                if (cellPosition) break;
            }

            if (!cellPosition) {
                return callback(new Error('Sayı kullanıcının kartında bulunamadı'));
            }

            if (lobby.markedNumbers[userId][cellPosition]) {
                return callback(new Error('Bu sayı zaten işaretli'));
            }

            lobby.markedNumbers[userId][cellPosition] = true;

            const isBingo = lobbyGameManager.checkBingo(card, lobby.markedNumbers[userId]);

            if (isBingo) {
                lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Bingo Kazandı', (historyErr) => { // Record win for bingo player
                    if (historyErr) console.error("Oyun geçmişi kaydetme hatası:", historyErr);
                    lobby.gameStarted = false; // Oyun bitti flag'i ekleyelim.
                    lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                        if (saveErr) return callback(saveErr);
                        callback(null, lobby, isBingo, number, cellPosition);
                    });
                }, userId); // Pass userId of bingo player
            } else {
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) return callback(err);
                    callback(null, lobby, isBingo, number, cellPosition);
                });
            }
        });
    },

    checkBingo: (card, markedNumbersForUser) => {
        const markedPositions = Object.keys(markedNumbersForUser);
        if (markedPositions.length < 15) return false;

        let markedCount = 0;
        for (let row = 0; row < card.length; row++) {
            for (let col = 0; col < card[row].length; col++) {
                if (card[row][col] !== null && markedNumbersForUser[`${row}-${col}`]) {
                    markedCount++;
                }
            }
        }
        return markedCount === 15;
    },

    getLobbyGameData: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }

            const gameData = {
                gameStarted: lobby.gameStarted,
                drawnNumbers: lobby.drawnNumbers,
                currentNumber: lobby.currentNumber,
                bingoCard: lobby.bingoCards ? lobby.bingoCards[userId] || null : null,
                markedNumbers: lobby.markedNumbers ? (lobby.markedNumbers[userId] || {}) : {},
            };
            callback(null, gameData);
        });
    },

    recordGameHistory: (lobbyCode, lobbies, resultMessage, callback, bingoUserId = null) => {
        const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
        if (!lobby) {
            return callback(new Error('Lobby not found for game history recording'));
        }

        const gameEndTime = new Date();

        lobby.members.forEach(member => {
            sessionStore.get(member.id, (err, userSession) => {
                if (err) {
                    console.error(`Session error getting user ${member.id} for game history:`, err);
                    return; // Continue to next member even if one fails
                }
                const gameHistory = userSession?.gameHistory || [];
                let result = 'Oyunu Kaybetti'; // Default lose for everyone
                if (bingoUserId && member.id === bingoUserId && resultMessage === 'Bingo Kazandı') {
                    result = 'Bingo Kazandı'; // Override to win only for bingo user
                } else if (resultMessage === 'Oyunu Kaybetti') {
                    result = 'Oyunu Kaybetti'; // Ensure lose for non-bingo players when game over by number pool
                } else if (resultMessage === 'Oyun Bitti') {
                    result = 'Oyun Bitti'; // For manual game end
                }


                gameHistory.push({
                    lobbyCode: lobbyCode,
                    lobbyName: lobby.lobbyName,
                    gameEndTime: gameEndTime,
                    result: result
                });
                sessionStore.set(member.id, { ...userSession, gameHistory: gameHistory }, (setErr) => {
                    if (setErr) {
                        console.error(`Session error saving game history for user ${member.id}:`, setErr);
                    }
                });
            });
        });
        callback(null);
    },

    getGameHistoryForUser: (userId, callback) => {
        sessionStore.get(userId, (err, userSession) => {
            if (err) return callback(err);
            const gameHistory = userSession?.gameHistory || [];
            callback(null, gameHistory);
        });
    },

    endGame: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Oyun henüz başlamadı veya zaten bitti')); // Oyun başlamadıysa veya zaten bittiyse de izin verilebilir, isteğe bağlı hata mesajı
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Sadece oda sahibi oyunu bitirebilir'));
            }

            lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Oyun Bitti', (historyErr) => {
                if (historyErr) console.error("Oyun geçmişi kaydetme hatası:", historyErr);
                lobby.gameStarted = false;
                lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                    if (saveErr) return callback(saveErr);
                    callback(null, lobby);
                });
            });
        });
    },
};

module.exports = lobbyGameManager;