const WebSocket = require('ws'); // Import WebSocket
const jwt = require('jsonwebtoken'); // Import JWT
require('dotenv').config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY;
const lobbySockets = {}; // Lobby koduna göre websocket bağlantılarını saklar

const lobbyStore = require('../memory/lobbyStore'); // Import lobbyStore

function BingoGameWebsocket(ws, request) {
    const lobbyCode = new URLSearchParams(request.url.split('?')[1]).get('lobbyCode');
    const token = new URLSearchParams(request.url.split('?')[1]).get('token'); // Get token from query parameters

    if (!lobbyCode) {
        console.log("BingoGameWebsocket: Lobby kodu eksik.");
        ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: Lobby kodu eksik' }));
        ws.close();
        return;
    }

    if (!token) {
        console.log("BingoGameWebsocket: Authentication token is required.");
        ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: Authentication token is required' }));
        ws.close();
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('BingoGameWebsocket: JWT Verification Error:', err);
            ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: Invalid or expired token' }));
            ws.close();
            return;
        }

        const userId = decoded.id; // Extract userId from decoded token

        lobbyStore.getLobbiesFromSession((sessionErr, lobbies) => {
            if (sessionErr) {
                console.error('BingoGameWebsocket: Error fetching lobbies from session:', sessionErr);
                ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: Internal server error' }));
                ws.close();
                return;
            }

            const lobby = Object.values(lobbies).find(l => l.code === lobbyCode);

            if (!lobby) {
                console.log(`BingoGameWebsocket: Lobby ${lobbyCode} not found.`);
                ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: Lobby not found' }));
                ws.close();
                return;
            }

            const isMember = lobby.members.some(member => member.id === userId);
            if (!isMember) {
                console.log(`BingoGameWebsocket: User ${userId} is not a member of Lobby ${lobbyCode}.`);
                ws.send(JSON.stringify({ type: 'error', message: 'BingoGameWebsocket: You are not a member of this lobby' }));
                ws.close();
                return;
            }

            console.log(`BingoGameWebsocket: User ${userId} connected to Lobby ${lobbyCode} via WebSocket`);

            if (!lobbySockets[lobbyCode]) {
                lobbySockets[lobbyCode] = [];
            }
            lobbySockets[lobbyCode].push(ws);

            ws.on('close', () => {
                console.log(`BingoGameWebsocket: Bağlantı kesildi, Lobby Kodu: ${lobbyCode}, User ID: ${userId}`);
                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode]; // Eğer lobiye ait kimse kalmadıysa, lobiyi sil
                    }
                }
            });

            ws.on('error', error => {
                console.error(`BingoGameWebsocket: WebSocket hatası, Lobby Kodu: ${lobbyCode}, User ID: ${userId}`, error);
                if (lobbySockets[lobbyCode]) {
                    lobbySockets[lobbyCode] = lobbySockets[lobbyCode].filter(socket => socket !== ws);
                    if (lobbySockets[lobbyCode].length === 0) {
                        delete lobbySockets[lobbyCode]; // Eğer lobiye ait kimse kalmadıysa, lobiyi sil
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
module.exports.lobbySockets = lobbySockets; // Export lobbySockets