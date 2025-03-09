const generateTombalaCard = require('../../utils/generateTombalaCard');
const lobbyManager = require('./lobbyManager');
const { sessionStore } = require('../../config/sessionConfig');
const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF3', '#FF8C33', '#8C33FF', '#33A1FF'];

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
            lobby.cardColors = {};
            lobby.completedRows = {}; // Initialize completedRows for each lobby
            lobby.members.forEach(member => {
                member.score = 0;
                const card = generateTombalaCard();
                lobby.bingoCards[member.username] = card;
                lobby.markedNumbers[member.username] = {};
                lobby.completedRows[member.username] = { 0: false, 1: false, 2: false }; // Initialize row completion status
                const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
                lobby.cardColors[member.username] = randomColor;
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
            /*
                  if (lobby.lastDrawTime) {
                      const lastDraw = new Date(lobby.lastDrawTime);
                      const now = new Date();
                      const timeDiff = now - lastDraw; // Difference in milliseconds
                      if (timeDiff < 6000) { // 6000 milliseconds = 6 seconds
                          const secondsRemaining = Math.ceil((6000 - timeDiff) / 1000);
                          return callback(new Error(`Lütfen ${secondsRemaining} saniye sonra tekrar deneyin`), secondsRemaining); // <----- Pass secondsRemaining here
                      }
                  }
            */

            if (lobby.numberPool.length === 0) {
                return callback(new Error('Çekilecek sayı kalmadı'), null, false);
            }

            const randomIndex = Math.floor(Math.random() * lobby.numberPool.length);
            const drawnNumber = lobby.numberPool.splice(randomIndex, 1)[0];
            lobby.drawnNumbers.push(drawnNumber);
            lobby.currentNumber = drawnNumber;
            lobby.lastDrawTime = new Date();

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby, drawnNumber, false);
            });
        });
    },

    checkRowCompletion: (card, markedNumbersForUser, completedRowsForUser) => {
        const rowCompletionDetails = [];
        for (let row = 0; row < card.length; row++) {
            if (!completedRowsForUser[row]) { // Check if row is not already completed
                let isRowComplete = true;
                for (let col = 0; col < card[row].length; col++) {
                    if (card[row][col] !== null && !markedNumbersForUser[`${row}-${col}`]) {
                        isRowComplete = false;
                        break;
                    }
                }
                if (isRowComplete) {
                    rowCompletionDetails.push(row);
                }
            }
        }
        return rowCompletionDetails;
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

            const member = lobby.members.find(m => m.id === userId);
            if (!member) {
                return callback(new Error('Kullanıcı lobi üyesi değil'));
            }
            const username = member.username;

            if (!lobby.bingoCards[username]) {
                return callback(new Error('Kullanıcıya ait tombala kartı bulunamadı'));
            }

            const card = lobby.bingoCards[username];
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

            if (lobby.markedNumbers[username][cellPosition]) {
                return callback(new Error('Bu sayı zaten işaretli'));
            }

            lobby.markedNumbers[username][cellPosition] = true;

            // Check for row completion *before* bingo check
            const completedRowIndices = lobbyGameManager.checkRowCompletion(card, lobby.markedNumbers[username], lobby.completedRows[username]);
            const rowBonus = 500;
            let rowCompleted = false;
            let completedRowNumbers = [];

            if (completedRowIndices.length > 0) {
                rowCompleted = true;
                completedRowIndices.forEach(rowIndex => {
                    if (!lobby.completedRows[username][rowIndex]) { // Double check to avoid double reward in case of latency
                        lobby.completedRows[username][rowIndex] = true;
                        lobby.members.find(m => m.id === userId).score += rowBonus;
                        completedRowNumbers.push(rowIndex + 1); // Row numbers are 1-indexed for user display
                    }
                });
            }


            const isBingo = lobbyGameManager.checkBingo(card, lobby.markedNumbers[username]);


            if (isBingo) {
                const bingoBonus = 1500;
                lobby.members.find(m => m.id === userId).score += bingoBonus;

                const scores = {};
                const bingoUser = lobby.members.find(m => m.id === userId);
                const bingoUsername = bingoUser ? bingoUser.username : 'Bilinmeyen Kullanıcı';
                scores[bingoUsername] = lobby.members.find(m => m.id === userId).score;

                lobby.members.forEach(otherMember => {
                    if (otherMember.id !== userId) {
                        const markedCount = lobbyGameManager.countMarkedNumbersForUser(lobby, otherMember.id);
                        const numberBasedScore = markedCount * 100;
                        otherMember.score += numberBasedScore;
                        scores[otherMember.username] = otherMember.score;
                    }
                });

                lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Bingo Kazandı', (historyErr) => {
                    if (historyErr) console.error("Oyun geçmişi kaydetme hatası:", historyErr);
                    lobby.gameStarted = false;
                    lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                        if (saveErr) return callback(saveErr);
                        callback(null, lobby, isBingo, number, cellPosition, scores, rowCompleted, completedRowNumbers); // Pass row completion info
                    });
                }, userId);
            } else {
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) return callback(err);
                    callback(null, lobby, isBingo, number, cellPosition, null, rowCompleted, completedRowNumbers); // Pass row completion info
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

    countMarkedNumbersForUser: (lobby, userId) => {
        const userCard = lobby.bingoCards[lobby.members.find(m => m.id === userId).username];
        if (!userCard) return 0;

        let markedCount = 0;
        const markedNumbersForUser = lobby.markedNumbers[lobby.members.find(m => m.id === userId).username];
        if (!markedNumbersForUser) return 0;

        for (let row = 0; row < userCard.length; row++) {
            for (let col = 0; col < userCard[row].length; col++) {
                if (userCard[row][col] !== null && markedNumbersForUser[`${row}-${col}`]) {
                    markedCount++;
                }
            }
        }
        return markedCount;
    },


    getLobbyGameData: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            const member = lobby.members.find(m => m.id === userId);
            const username = member.username;

            const gameData = {
                gameStarted: lobby.gameStarted,
                drawnNumbers: lobby.drawnNumbers,
                currentNumber: lobby.currentNumber,
                bingoCard: lobby.bingoCards ? lobby.bingoCards[username] || null : null,
                markedNumbers: lobby.markedNumbers ? (lobby.markedNumbers[username] || {}) : {},
                cardColor: lobby.cardColors ? lobby.cardColors[username] || null : null,
                scores: lobby.members.reduce((scoresObj, member) => {
                    scoresObj[member.username] = member.score || 0;
                    return scoresObj;
                }, {}),
                completedRows: lobby.completedRows ? (lobby.completedRows[username] || { 0: false, 1: false, 2: false }) : { 0: false, 1: false, 2: false } // Send completedRows data
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
                    return;
                }
                const gameHistory = userSession?.gameHistory || [];
                let result = 'Oyunu Kaybetti';
                if (bingoUserId && member.id === bingoUserId && resultMessage === 'Bingo Kazandı') {
                    result = 'Bingo Kazandı';
                } else if (resultMessage === 'Oyunu Kaybetti') {
                    result = 'Oyunu Kaybetti';
                } else if (resultMessage === 'Oyun Bitti') {
                    result = 'Oyun Bitti';
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
                return callback(new Error('Oyun henüz başlamadı veya zaten bitti'));
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