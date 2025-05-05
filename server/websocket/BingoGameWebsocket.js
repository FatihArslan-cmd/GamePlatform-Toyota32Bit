const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const lobbySockets = {};

const lobbyManager = require('../memory/LobbyStore/lobbyManager');
const lobbyGameManager = require('../memory/LobbyStore/lobbyGameManager');
const { getUserDetails } = require('../utils/getUserDetails');

function BingoGameWebsocket(ws, request) {
    const lobbyCode = new URLSearchParams(request.url.split('?')[1]).get('lobbyCode');
    const token = new URLSearchParams(request.url.split('?')[1]).get('token');

    if (!lobbyCode || !token) {
        ws.send(JSON.stringify({ type: 'error', message: 'Lobby code or token missing' }));
        ws.close();
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
            ws.close();
            return;
        }

        const userId = decoded.id;

        lobbyManager.getLobbiesFromSession((sessionErr, lobbies) => {
            if (sessionErr) {
                ws.send(JSON.stringify({ type: 'error', message: 'Server error' }));
                ws.close();
                return;
            }

            const lobby = Object.values(lobbies).find(l => l.code === lobbyCode);
            if (!lobby || !lobby.members.some(member => member.id === userId)) {
                ws.send(JSON.stringify({ type: 'error', message: 'Lobby not found or you are not a member' }));
                ws.close();
                return;
            }

            console.log(`WebSocket: User ${userId} connected to Lobby ${lobbyCode}`);

            if (!lobbySockets[lobbyCode]) {
                lobbySockets[lobbyCode] = [];
            }
            lobbySockets[lobbyCode].push(ws);

            const userDetails = getUserDetails(userId);

            BingoGameWebsocket.broadcast(lobbyCode, {
                 type: 'user-connected',
                 userId: userId,
                 username: userDetails.username,
                 profilePhoto: userDetails.profilePhoto
            });

            lobbyGameManager.getLobbyGameData(lobbyCode, userId, (gameDataErr, gameData) => {
                if (gameDataErr) {
                    console.error("Error fetching game data:", gameDataErr);
                    ws.send(JSON.stringify({ type: 'error', message: 'Could not fetch game data: ' + gameDataErr.message }));
                    return;
                }
                ws.send(JSON.stringify({ type: 'game-data', gameData }));

            });

            ws.on('message', message => {
                try {
                    const parsedMessage = JSON.parse(message);
                    console.log(`Received message: ${parsedMessage.type} from user ${userId} in lobby ${lobbyCode}`);

                    if (parsedMessage.type === 'draw-number') {
                         if (lobby.ownerId === userId) {
                            lobbyGameManager.drawNumber(lobbyCode, userId, (drawErr, updatedLobby, drawnNumber, isLastNumber) => {
                                if (drawErr) {
                                    // Passing secondsRemaining from the error object
                                    ws.send(JSON.stringify({ type: 'error', message: drawErr.message, secondsRemaining: drawErr.secondsRemaining }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, {
                                    type: 'number-drawn',
                                    number: drawnNumber,
                                    drawnNumbers: updatedLobby.drawnNumbers,
                                    currentNumber: drawnNumber,
                                    isLastNumber: isLastNumber
                                });
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Only the lobby owner can draw numbers.' }));
                        }
                    } else if (parsedMessage.type === 'mark-number') {
                        const numberToMark = parsedMessage.number;
                        if (typeof numberToMark !== 'number') {
                            ws.send(JSON.stringify({ type: 'error', message: 'Invalid number format' }));
                            return;
                        }
                        lobbyGameManager.markNumberOnCard(lobbyCode, userId, numberToMark, (markErr, updatedLobby, isBingo, markedNumber, cellPosition, scores, rowCompleted, completedRowNumbers, playerStats) => {
                            if (markErr) {
                                // These error messages come from lobbyGameManager, already translated in the previous step
                                ws.send(JSON.stringify({ type: 'error', message: markErr.message }));
                                return;
                            }

                            const markingUserDetails = getUserDetails(userId);

                            BingoGameWebsocket.broadcast(lobbyCode, {
                                type: 'number-marked',
                                userId: userId,
                                username: markingUserDetails.username,
                                profilePhoto: markingUserDetails.profilePhoto,
                                number: markedNumber,
                                cellPosition: cellPosition,
                                playerStats: playerStats,
                                scores: scores
                            });

                            if (rowCompleted) {
                                const userDetails = getUserDetails(userId);
                                completedRowNumbers.forEach(rowNumber => {
                                     BingoGameWebsocket.broadcast(lobbyCode, {
                                        type: 'row-completed',
                                        userId: userId,
                                        username: userDetails.username,
                                        rowNumber: rowNumber,
                                        profilePhoto: userDetails.profilePhoto
                                    });
                                });
                            }

                            if (isBingo) {
                                const userDetails = getUserDetails(userId);
                                BingoGameWebsocket.broadcast(lobbyCode, {
                                    type: 'bingo',
                                    userId: userId,
                                    username: userDetails.username,
                                    profilePhoto: userDetails.profilePhoto,
                                    scores: scores
                                });
                            }
                        });
                    } else if (parsedMessage.type === 'send-emoji') {
                         const emoji = parsedMessage.emoji;
                         if (!emoji) {
                             ws.send(JSON.stringify({ type: 'error', message: 'Emoji not sent' }));
                             return;
                         }

                         const userDetails = getUserDetails(userId);

                         BingoGameWebsocket.broadcast(lobbyCode, {
                            type: 'emoji-received',
                            userId: userId,
                            username: userDetails.username,
                            profilePhoto: userDetails.profilePhoto,
                            emoji: emoji,
                         });

                    } else if (parsedMessage.type === 'end-game') {
                         if (lobby.ownerId === userId) {
                             lobbyGameManager.endGame(lobbyCode, userId, (endGameErr, updatedLobby) => { // Removed finalScores from callback as it's not returned by endGame function
                                if (endGameErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: endGameErr.message }));
                                    return;
                                }
                                // Re-fetch player stats after game ends to include final scores if needed, or rely on previous broadcasts
                                // For simplicity, just broadcast game-ended state
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'game-ended' }); // Removed scores here too
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Only the lobby owner can end the game.' }));
                        }

                    } else if (parsedMessage.type === 'chat-message') {
                         const messageText = parsedMessage.message;
                         if (!messageText || typeof messageText !== 'string' || messageText.trim() === '') {
                             ws.send(JSON.stringify({ type: 'error', message: 'Message content cannot be empty' }));
                             return;
                         }

                         const userDetails = getUserDetails(userId);
                         const timestamp = new Date().toISOString();

                         BingoGameWebsocket.broadcast(lobbyCode, {
                             type: 'chat-message-received',
                             userId: userId,
                             username: userDetails.username,
                             profilePhoto: userDetails.profilePhoto,
                             message: messageText.trim(),
                             timestamp: timestamp
                         });

                    } else if (parsedMessage.type === 'draw-all-remaining') {
                        console.log(`Received 'draw-all-remaining' from user ${userId} in lobby ${lobbyCode}`);
                         if (lobby.ownerId === userId) {
                            lobbyGameManager.drawAllRemainingNumbers(lobbyCode, userId, (drawErr, updatedLobby, allDrawnNumbers) => {
                                if (drawErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: drawErr.message }));
                                    return;
                                }
                                console.log(`Successfully drew ${allDrawnNumbers.length} numbers. Broadcasting.`);

                                BingoGameWebsocket.broadcast(lobbyCode, {
                                    type: 'all-numbers-drawn',
                                    drawnNumbers: updatedLobby.drawnNumbers,
                                    currentNumber: null,
                                    totalNumbersDrawn: updatedLobby.drawnNumbers.length
                                });
                            });
                        } else {
                             ws.send(JSON.stringify({ type: 'error', message: 'Only the lobby owner can draw all remaining numbers.' }));
                        }
                    }

                } catch (e) {
                    console.error("WebSocket message processing error:", e);
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format or processing error' }));
                }
            });

            ws.on('close', () => {
                console.log(`WebSocket: Connection closed, Lobby: ${lobbyCode}, User: ${userId}`);

                const userDetails = getUserDetails(userId);
                BingoGameWebsocket.broadcast(lobbyCode, {
                     type: 'user-disconnected',
                     userId: userId,
                     username: userDetails.username
                });

                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode];
                    }
                }
            });

            ws.on('error', error => {
                console.error(`WebSocket: Error, Lobby: ${lobbyCode}, User: ${userId}`, error);
                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode];
                    }
                }
            });
        });
    });
}

BingoGameWebsocket.broadcast = (lobbyCode, message) => {
    if (lobbySockets[lobbyCode]) {
        lobbySockets[lobbyCode].forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                try {
                     ws.send(JSON.stringify(message));
                } catch (error) {
                     console.error(`WebSocket broadcast error to user in lobby ${lobbyCode}:`, error);
                }
            }
        });
    }
};

module.exports = BingoGameWebsocket;
module.exports.broadcast = BingoGameWebsocket.broadcast;
module.exports.lobbySockets = lobbySockets;