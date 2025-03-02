const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const lobbySockets = {};

const lobbyManager = require('../memory/LobbyStore/lobbyManager'); // Correctly import lobbyManager
const lobbyGameManager = require('../memory/LobbyStore/lobbyGameManager'); // Import lobbyGameManager
const { getUserDetails } = require('../utils/getUserDetails'); // Import getUserDetails from usersUtil

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

        lobbyManager.getLobbiesFromSession((sessionErr, lobbies) => { // Use lobbyManager for getLobbiesFromSession
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

            // Kullanıcıya oyun verilerini gönder (kart, çekilen sayılar vb.)
            lobbyGameManager.getLobbyGameData(lobbyCode, userId, (gameDataErr, gameData) => { // Use lobbyGameManager for getLobbyGameData
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
                            lobbyGameManager.drawNumber(lobbyCode, userId, (drawErr, updatedLobby, drawnNumber) => { // Use lobbyGameManager for drawNumber
                                if (drawErr) {
                                    ws.send(JSON.stringify({ type: 'error', message: drawErr.message }));
                                    return;
                                }
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'number-drawn', number: drawnNumber, drawnNumbers: updatedLobby.drawnNumbers });
                            });
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Sadece oda sahibi sayı çekebilir.' }));
                        }
                    } else if (parsedMessage.type === 'mark-number') { // Yeni mesaj tipi: mark-number
                        const numberToMark = parsedMessage.number;
                        if (typeof numberToMark !== 'number') {
                            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz sayı formatı' }));
                            return;
                        }
                        lobbyGameManager.markNumberOnCard(lobbyCode, userId, numberToMark, (markErr, updatedLobby, isBingo, markedNumber, cellPosition) => { // Use lobbyGameManager for markNumberOnCard
                            if (markErr) {
                                ws.send(JSON.stringify({ type: 'error', message: markErr.message }));
                                return;
                            }

                            BingoGameWebsocket.broadcast(lobbyCode, {
                                type: 'number-marked', // Sayı işaretlendi mesajı
                                userId: userId,
                                number: markedNumber,
                                cellPosition: cellPosition,
                                markedNumbers: updatedLobby.markedNumbers, // Tüm oyuncuların işaretlediği numaraları gönder
                            });

                            if (isBingo) {
                                BingoGameWebsocket.broadcast(lobbyCode, { type: 'bingo', userId: userId }); // Bingo mesajı
                            }
                        });
                    } else if (parsedMessage.type === 'send-emoji') { // Yeni mesaj tipi: send-emoji
                        const emoji = parsedMessage.emoji;
                        if (!emoji) {
                            ws.send(JSON.stringify({ type: 'error', message: 'Emoji gönderilmedi' }));
                            return;
                        }

                        const userDetails = getUserDetails(userId);
                        const username = userDetails ? userDetails.username : 'Bilinmeyen Kullanıcı'; // Username al

                        BingoGameWebsocket.broadcast(lobbyCode, {
                            type: 'emoji-received', // Yeni mesaj tipi: emoji-received (istemcilere yayınlanacak)
                            userId: userId,
                            username: username, // Username'i de gönder
                            emoji: emoji
                        });
                    }
                    // ... Diğer mesaj tipleri buraya eklenebilir ...
                } catch (e) {
                    console.error("WebSocket mesaj hatası:", e);
                    ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz mesaj formatı' }));
                }
            });


            ws.on('close', () => {
                console.log(`WebSocket: Bağlantı kesildi, Lobby: ${lobbyCode}, User: ${userId}`);
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