const WebSocket = require('ws');
const FriendChatWebsocketHandler = require('./FriendChatWebsocket');
const RoomChatWebsocketHandler = require('./RoomChatWebsocket');

function WebsocketManager(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, request) => {
        const urlPath = request.url.split('?')[0]; // URL yolunu al (query parametrelerini atla)
        console.log(`WebSocketManager: Yeni bağlantı yolu: ${urlPath}`);

        if (urlPath === '/friendchat') {
            FriendChatWebsocketHandler(ws, request); // FriendChat modülüne yönlendir
        } else if (urlPath === '/roomchat') {
            RoomChatWebsocketHandler(ws, request);   // RoomChat modülüne yönlendir
        }
        else {
            console.log(`WebSocketManager: Geçersiz WebSocket yolu: ${urlPath}`);
            ws.send(JSON.stringify({ type: 'error', message: 'WebSocketManager: Geçersiz WebSocket yolu' }));
            ws.close();
        }
    });

    console.log('WebSocketManager: Başlatıldı.');
}

module.exports = WebsocketManager;