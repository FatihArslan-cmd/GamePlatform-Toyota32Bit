// WebsocketManager.js
const WebSocket = require('ws');
const FriendChatWebsocketHandler = require('./FriendChatWebsocket');
const RoomChatWebsocketHandler = require('./RoomChatWebsocket');
const BingoGameWebsocket = require('./BingoGameWebsocket');
const { lobbySockets } = require('./BingoGameWebsocket'); // Import lobbySockets

function WebsocketManager(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, request) => {
        const urlPath = request.url.split('?')[0]; // URL yolunu al (query parametrelerini atla)
        console.log(`WebSocketManager: Yeni bağlantı yolu: ${urlPath}`);

        if (urlPath === '/friendchat') {
            FriendChatWebsocketHandler(ws, request);
        } else if (urlPath === '/roomchat') {
            RoomChatWebsocketHandler(ws, request);
        }
        else if (urlPath === '/bingoGame') {
            BingoGameWebsocket(ws, request);
        }
        else {
            console.log(`WebSocketManager: Geçersiz WebSocket yolu: ${urlPath}`);
            ws.send(JSON.stringify({ type: 'error', message: 'WebSocketManager: Geçersiz WebSocket yolu' }));
            ws.close();
        }
    });

    // Remove this line, we will call BingoGameWebsocket.broadcast directly
    // WebsocketManager.BingoGameWebsocket = BingoGameWebsocket.broadcast;

    // Add a method to WebsocketManager to broadcast bingo game messages
    WebsocketManager.prototype.broadcastBingoGameMessage = function(lobbyCode, message) {
        BingoGameWebsocket.broadcast(lobbyCode, message);
    };


    console.log('WebSocketManager: Başlatıldı.');
}

module.exports = WebsocketManager;