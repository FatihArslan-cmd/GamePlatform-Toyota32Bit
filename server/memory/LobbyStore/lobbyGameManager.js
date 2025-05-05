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
                return callback(new Error('Lobby not found'));
            }
            if (lobby.gameStarted) {
                return callback(new Error('Game has already started'));
            }

            lobby.gameStarted = true;
            lobby.drawnNumbers = [];
            lobby.currentNumber = null;
            lobby.numberPool = Array.from({ length: 90 }, (_, i) => i + 1);
            lobby.bingoCards = {};
            lobby.markedNumbers = {};
            lobby.cardColors = {};
            lobby.completedRows = {};
            lobby.members.forEach(member => {
                member.score = 0;
                const card = generateTombalaCard();
                lobby.bingoCards[member.username] = card;
                lobby.markedNumbers[member.username] = {};
                lobby.completedRows[member.username] = { 0: false, 1: false, 2: false };
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
                return callback(new Error('Lobby not found'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Game has not started yet'));
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can draw numbers'));
            }

            if (lobby.lastDrawTime) {
                const lastDraw = new Date(lobby.lastDrawTime);
                const now = new Date();
                const timeDiff = now - lastDraw;
                if (timeDiff < 3000) {
                    const secondsRemaining = Math.ceil((3000 - timeDiff) / 1000);
                    return callback(new Error(`Please try again after ${secondsRemaining} seconds`), secondsRemaining);
                }
            }

            if (lobby.numberPool.length === 0) {
                return callback(new Error('No numbers left to draw'), null, null, true);
            }

            const randomIndex = Math.floor(Math.random() * lobby.numberPool.length);
            const drawnNumber = lobby.numberPool.splice(randomIndex, 1)[0];
            lobby.drawnNumbers.push(drawnNumber);
            lobby.currentNumber = drawnNumber;
            lobby.lastDrawTime = new Date();

            const isLastNumber = lobby.numberPool.length === 0;

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby, drawnNumber, isLastNumber);
            });
        });
    },

    drawAllRemainingNumbers: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
             if (!lobby) {
                return callback(new Error('Lobby not found'));
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can draw all numbers'));
            }

            if (lobby.numberPool.length === 0) {
                return callback(new Error('No numbers left to draw'), null, []);
            }

            const allDrawnNumbers = [...lobby.numberPool];
            lobby.drawnNumbers.push(...allDrawnNumbers);
            lobby.numberPool = [];
            lobby.currentNumber = null;

            lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                if (saveErr) return callback(saveErr);
                callback(null, lobby, allDrawnNumbers);
            });
        });
    },


    checkRowCompletion: (card, markedNumbersForUser, completedRowsForUser) => {
        const rowCompletionDetails = [];
        for (let row = 0; row < card.length; row++) {
            if (!completedRowsForUser[row]) {
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
                return callback(new Error('Lobby not found'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Game has not started yet'));
            }

            const member = lobby.members.find(m => m.id === userId);
            if (!member) {
                return callback(new Error('User is not a lobby member'));
            }
            const username = member.username;

            if (!lobby.bingoCards[username]) {
                return callback(new Error('Tombala card not found for user'));
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
                return callback(new Error('Number not found on user\'s card'));
            }

            if (lobby.markedNumbers[username] && lobby.markedNumbers[username][cellPosition]) {
                return callback(new Error('This number is already marked'));
            }

            if (!lobby.markedNumbers[username]) {
                 lobby.markedNumbers[username] = {};
            }
            lobby.markedNumbers[username][cellPosition] = true;

            const completedRowIndices = lobbyGameManager.checkRowCompletion(card, lobby.markedNumbers[username] || {}, lobby.completedRows[username] || { 0: false, 1: false, 2: false });
            const rowBonus = 500;
            let rowCompleted = false;
            let completedRowNumbers = [];
            let scoreChanged = false;


            if (completedRowIndices.length > 0) {
                rowCompleted = true;
                if (!lobby.completedRows[username]) {
                    lobby.completedRows[username] = { 0: false, 1: false, 2: false };
                }
                 const memberToUpdate = lobby.members.find(m => m.id === userId);
                completedRowIndices.forEach(rowIndex => {
                    if (!lobby.completedRows[username][rowIndex]) {
                        lobby.completedRows[username][rowIndex] = true;
                        if (memberToUpdate) {
                             memberToUpdate.score += rowBonus;
                             scoreChanged = true;
                        }
                        completedRowNumbers.push(rowIndex + 1);
                    }
                });
            }

            const isBingo = lobbyGameManager.checkBingo(card, lobby.markedNumbers[username] || {});

            if (isBingo) {
                const bingoBonus = 1500;
                const memberToUpdate = lobby.members.find(m => m.id === userId);
                 if (memberToUpdate) {
                     memberToUpdate.score += bingoBonus;
                     scoreChanged = true;
                 }


                const scores = {};
                 if (memberToUpdate) {
                      scores[memberToUpdate.username] = memberToUpdate.score;
                 }


                lobby.members.forEach(otherMember => {
                    if (otherMember.id !== userId) {
                        const markedCount = lobbyGameManager.countMarkedNumbersForUser(lobby, otherMember.id);
                        const numberBasedScore = markedCount * 100;
                         const otherMemberToUpdate = lobby.members.find(m => m.id === otherMember.id);
                         if (otherMemberToUpdate) {
                             otherMemberToUpdate.score += numberBasedScore;
                             scores[otherMemberToUpdate.username] = otherMemberToUpdate.score;
                         } else {
                              scores[otherMember.username] = (otherMember.score || 0) + numberBasedScore;
                         }
                    } else {
                         if (memberToUpdate && !scores[memberToUpdate.username]) {
                             scores[memberToUpdate.username] = memberToUpdate.score;
                         }
                    }
                });


                lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Won Bingo', (historyErr) => {
                    if (historyErr) console.error("Game history saving error:", historyErr);
                    lobby.gameStarted = false;
                    lobbyManager.saveLobbiesToSession(lobbies, (saveErr) => {
                        if (saveErr) return callback(saveErr);
                        const playerStats = lobbyGameManager.getPlayerStatsForLobby(lobby);
                        callback(null, lobby, isBingo, number, cellPosition, scores, rowCompleted, completedRowNumbers, playerStats);
                    });
                }, userId);
            } else {
                 const currentScores = lobby.members.reduce((scoresObj, member) => {
                     scoresObj[member.username] = member.score || 0;
                     return scoresObj;
                 }, {});

                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) return callback(err);
                    const playerStats = lobbyGameManager.getPlayerStatsForLobby(lobby);
                    callback(null, lobby, isBingo, number, cellPosition, scoreChanged ? currentScores : null, rowCompleted, completedRowNumbers, playerStats);
                });
            }
        });
    },

    getPlayerStatsForLobby: (lobby) => {
        const playerStats = {};
        lobby.members.forEach(member => {
            const username = member.username;
            const markedNumbersCount = lobbyGameManager.countMarkedNumbersForUser(lobby, member.id);
            const completedRowsCount = lobby.completedRows && lobby.completedRows[username] ? Object.values(lobby.completedRows[username]).filter(Boolean).length : 0;
            playerStats[member.id] = {
                markedNumbersCount: markedNumbersCount,
                completedRowsCount: completedRowsCount,
                score: member.score || 0
            };
        });
        return playerStats;
    },

    checkBingo: (card, markedNumbersForUser) => {
         if (!markedNumbersForUser) return false;

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
        const member = lobby.members.find(m => m.id === userId);
        if (!member) return 0;
        const username = member.username;

        const userCard = lobby.bingoCards ? lobby.bingoCards[username] : null;
        if (!userCard) return 0;

        let markedCount = 0;
        const markedNumbersForUser = lobby.markedNumbers ? lobby.markedNumbers[username] : null;
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
                return callback(new Error('Lobby not found'));
            }
            const member = lobby.members.find(m => m.id === userId);
             if (!member) {
                return callback(new Error('User is not a lobby member'));
            }
            const username = member.username;


            const gameData = {
                gameStarted: lobby.gameStarted,
                drawnNumbers: lobby.drawnNumbers || [],
                currentNumber: lobby.currentNumber || null,
                bingoCard: lobby.bingoCards ? lobby.bingoCards[username] || null : null,
                markedNumbers: lobby.markedNumbers ? (lobby.markedNumbers[username] || {}) : {},
                cardColor: lobby.cardColors ? lobby.cardColors[username] || null : null,
                 scores: lobby.members.reduce((scoresObj, member) => {
                    scoresObj[member.username] = member.score || 0;
                    return scoresObj;
                }, {}),
                completedRows: (lobby.completedRows && lobby.completedRows[username]) ? lobby.completedRows[username] : { 0: false, 1: false, 2: false },
                playerStats: lobbyGameManager.getPlayerStatsForLobby(lobby),
                isOwner: lobby.ownerId === userId
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
                let result = 'Lost Game';
                if (bingoUserId && member.id === bingoUserId && resultMessage === 'Won Bingo') {
                    result = 'Won Bingo';
                } else if (resultMessage === 'Lost Game') {
                    result = 'Lost Game';
                } else if (resultMessage === 'Game Ended') {
                    result = 'Game Ended';
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
                return callback(new Error('Lobby not found'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Game has not started yet or has already ended'));
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can end the game'));
            }

            lobbyGameManager.recordGameHistory(lobbyCode, lobbies, 'Game Ended', (historyErr) => {
                if (historyErr) console.error("Game history saving error:", historyErr);
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