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
        // Move userDetails and username declarations here, after userId is defined
        const userDetails = getUserDetails(userId);
        const username = userDetails ? userDetails.username : 'Bilinmeyen Kullanıcı';

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

            console.log(`WebSocket: User ${userId} (${username}) connected to Lobby ${lobbyCode}`);

            if (!lobbySockets[lobbyCode]) {
                lobbySockets[lobbyCode] = [];
            }
            lobbySockets[lobbyCode].push(ws);

            // Broadcast user joined message
            BingoGameWebsocket.broadcast(lobbyCode, { type: 'user-joined', userId: userId, username: username });


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
                            lobbyGameManager.drawNumber(lobbyCode, userId, (drawErr, updatedLobby, drawnNumber, isGameOver) => {
                                if (drawErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: drawErr.message }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'number-drawn', number: drawnNumber, drawnNumbers: updatedLobby.drawnNumbers });
                                if (isGameOver) {
                                    BingoGameWebsocket.broadcast(lobbyCode, { type: 'game-over', message: 'Oyun bitti, çekilecek sayı kalmadı.' });
                                    // Prompt owner for new game
                                    const ownerSocket = lobbySockets[lobbyCode]?.find(socket => lobby.ownerId === userId && socket.readyState === WebSocket.OPEN);
                                    if (ownerSocket) {
                                        ownerSocket.send(JSON.stringify({ type: 'prompt-new-game', message: 'Yeni oyun başlatılsın mı?' }));
                                    }
                                }
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Sadece oda sahibi sayı çekebilir.' }));
                        }
                    } else if (parsedMessage.type === 'mark-number') {
                        const numberToMark = parsedMessage.number;
                        if (typeof numberToMark !== 'number') {
                            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz sayı formatı' }));
                            return;
                        }
                        lobbyGameManager.markNumberOnCard(lobbyCode, userId, numberToMark, (markErr, updatedLobby, isBingo, markedNumber, cellPosition) => {
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
                            });

                            if (isBingo) {
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'bingo', userId: userId,username: username });
                                // Prompt owner for new game after bingo
                                const ownerSocket = lobbySockets[lobbyCode]?.find(socket => updatedLobby.ownerId === updatedLobby.ownerId && socket.readyState === WebSocket.OPEN);
                                if (ownerSocket && updatedLobby.ownerId !== userId) { // Don't prompt if bingo player is owner.
                                    ownerSocket.send(JSON.stringify({ type: 'prompt-new-game', message: `${username} BINGO yaptı! Yeni oyun başlatılsın mı?` }));
                                } else if (updatedLobby.ownerId === userId) {
                                    ownerSocket.send(JSON.stringify({ type: 'prompt-new-game', message: `BINGO! Yeni oyun başlatılsın mı?` }));
                                }
                            }
                        });
                    } else if (parsedMessage.type === 'send-emoji') {
                        const emoji = parsedMessage.emoji;
                        if (!emoji) {
                            ws.send(JSON.stringify({ type: 'error', message: 'Emoji gönderilmedi' }));
                            return;
                        }


                        BingoGameWebsocket.broadcast(lobbyCode, {
                            type: 'emoji-received',
                            userId: userId,
                            username: username,
                            emoji: emoji
                        });
                    } else if (parsedMessage.type === 'start-new-round') { // Handle new game prompt response
                        if (lobby.ownerId === userId) {
                            lobbyGameManager.startGame(lobbyCode, (startErr, newLobby) => {
                                if (startErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: startErr.message }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'new-game-started', message: 'Yeni oyun başladı!', gameData: { bingoCards: newLobby.bingoCards, drawnNumbers: newLobby.drawnNumbers, markedNumbers: newLobby.markedNumbers } });
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Sadece oda sahibi yeni oyunu başlatabilir.' }));
                        }
                    }
                    // ... Diğer mesaj tipleri buraya eklenebilir ...
                } catch (e) {
                    console.error("WebSocket mesaj hatası:", e);
                    ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz mesaj formatı' }));
                }
            });


            ws.on('close', () => {
                console.log(`WebSocket: Bağlantı kesildi, Lobby: ${lobbyCode}, User: ${userId} (${username})`);
                // Broadcast user left message
                BingoGameWebsocket.broadcast(lobbyCode, { type: 'user-left', userId: userId, username: username });
                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode];
                    }
                }
            });

            ws.on('error', error => {
                console.error(`WebSocket: Hata, Lobby: ${lobbyCode}, User: ${userId} (${username})`, error);
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