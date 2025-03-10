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
        ws.send(JSON.stringify({ type: 'error', message: 'Lobby kodu veya token eksik' }));
        ws.close();
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz token' }));
            ws.close();
            return;
        }

        const userId = decoded.id;

        lobbyManager.getLobbiesFromSession((sessionErr, lobbies) => {
            if (sessionErr) {
                ws.send(JSON.stringify({ type: 'error', message: 'Sunucu hatası' }));
                ws.close();
                return;
            }

            const lobby = Object.values(lobbies).find(l => l.code === lobbyCode);
            if (!lobby || !lobby.members.some(member => member.id === userId)) {
                ws.send(JSON.stringify({ type: 'error', message: 'Lobby bulunamadı veya üye değilsiniz' }));
                ws.close();
                return;
            }

            console.log(`WebSocket: User ${userId} connected to Lobby ${lobbyCode}`);

            if (!lobbySockets[lobbyCode]) {
                lobbySockets[lobbyCode] = [];
            }
            lobbySockets[lobbyCode].push(ws);

            const userDetails = getUserDetails(userId);
      
            BingoGameWebsocket.broadcast(lobbyCode, { type: 'user-connected', userId: userId, username: userDetails.username, profilePhoto: userDetails.profilePhoto });


            lobbyGameManager.getLobbyGameData(lobbyCode, userId, (gameDataErr, gameData) => { 
                if (gameDataErr) {
                    console.error("Oyun verisi alınırken hata:", gameDataErr);
                    ws.send(JSON.stringify({ type: 'error', message: 'Oyun verisi alınamadı' }));
                    return;
                }
                ws.send(JSON.stringify({ type: 'game-data', gameData }));
            });


            ws.on('message', message => {
                try {
                    const parsedMessage = JSON.parse(message);
                    if (parsedMessage.type === 'draw-number') {
                        if (lobby.ownerId === userId) {
                            lobbyGameManager.drawNumber(lobbyCode, userId, (drawErr, updatedLobby, drawnNumber) => {
                                if (drawErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: drawErr.message }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'number-drawn', number: drawnNumber, drawnNumbers: updatedLobby.drawnNumbers });
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Sadece oda sahibi sayı çekebilir.' }));
                        }
                    }
                    else if (parsedMessage.type === 'mark-number') {
                        const numberToMark = parsedMessage.number;
                        if (typeof numberToMark !== 'number') {
                            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz sayı formatı' }));
                            return;
                        }
                        lobbyGameManager.markNumberOnCard(lobbyCode, userId, numberToMark, (markErr, updatedLobby, isBingo, markedNumber, cellPosition, scores, rowCompleted, completedRowNumbers, playerStats) => { // playerStats parametresi eklendi
                            if (markErr) {
                                ws.send(JSON.stringify({ type: 'error', message: markErr.message }));
                                return;
                            }

                            BingoGameWebsocket.broadcast(lobbyCode, {
                                type: 'number-marked',
                                userId: userId,
                                number: markedNumber,
                                cellPosition: cellPosition,
                                markedNumbers: updatedLobby.markedNumbers,
                                playerStats: playerStats // Oyuncu istatistiklerini broadcast mesajına ekle
                            });

                            if (rowCompleted) {
                                const userDetails = getUserDetails(userId);
                                completedRowNumbers.forEach(rowNumber => {
                                    BingoGameWebsocket.broadcast(lobbyCode, { type: 'row-completed', username: userDetails.username, rowNumber: rowNumber, profilePhoto: userDetails.profilePhoto }); // Row completed message
                                });
                            }

                            if (isBingo) {
                                const userDetails = getUserDetails(userId);
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'bingo', username: userDetails.username, profilePhoto: userDetails.profilePhoto, scores: scores }); // Bingo mesajı, userId yerine username gönder, scores eklendi
                            }
                        });
                    }
                    else if (parsedMessage.type === 'send-emoji') {
                        const emoji = parsedMessage.emoji;
                        if (!emoji) {
                            ws.send(JSON.stringify({ type: 'error', message: 'Emoji gönderilmedi' }));
                            return;
                        }

                        const userDetails = getUserDetails(userId);

                        BingoGameWebsocket.broadcast(lobbyCode, {
                            type: 'emoji-received', 
                            userId: userId,
                            username: userDetails.username,
                            emoji: emoji,
                        });
                    } else if (parsedMessage.type === 'end-game') { 
                        if (lobby.ownerId === userId) {
                            lobbyGameManager.endGame(lobbyCode, userId, (endGameErr) => {
                                if (endGameErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: endGameErr.message }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'game-ended' }); 
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Sadece oda sahibi oyunu bitirebilir.' }));
                        }
                    } else if (parsedMessage.type === 'chat-message') { 
                        const messageText = parsedMessage.message;
                        if (!messageText) {
                            ws.send(JSON.stringify({ type: 'error', message: 'Mesaj içeriği boş olamaz' }));
                            return;
                        }

                        const userDetails = getUserDetails(userId);

                        const timestamp = new Date().toISOString(); 

                        BingoGameWebsocket.broadcast(lobbyCode, {
                            type: 'chat-message-received',
                            userId: userId,
                            username: userDetails.username,
                            profilePhoto: userDetails.profilePhoto,
                            message: messageText,
                            timestamp: timestamp
                        });
                    }
                } catch (e) {
                    console.error("WebSocket mesaj hatası:", e);
                    ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz mesaj formatı' }));
                }
            });


            ws.on('close', () => {
                console.log(`WebSocket: Bağlantı kesildi, Lobby: ${lobbyCode}, User: ${userId}`);

                const userDetails = getUserDetails(userId);
                BingoGameWebsocket.broadcast(lobbyCode, { type: 'user-disconnected', userId: userId, username: userDetails.username});


                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode];
                    }
                }
            });

            ws.on('error', error => {
                console.error(`WebSocket: Hata, Lobby: ${lobbyCode}, User: ${userId}`, error);
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
                ws.send(JSON.stringify(message));
            }
        });
    }
};

module.exports = BingoGameWebsocket;
module.exports.broadcast = BingoGameWebsocket.broadcast;
module.exports.lobbySockets = lobbySockets;