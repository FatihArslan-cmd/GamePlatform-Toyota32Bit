// websocket/websocketServer.js
const WebSocket = require('ws');
const { getRoom } = require('../memory/chatRoomStore'); // room işlemlerini yapabilmek için import ediyoruz

function initializeWebSocketServer(server, sessionConfig) {
    const wss = new WebSocket.Server({ server });

    // Tüm kullanıcı bağlantılarını ve topic'leri saklamak için Map'ler
    const clients = new Map(); // Map<userId, WebSocket>
    const userTopics = new Map(); // Map<userId, Set<topicId>>


    wss.on('connection', (ws, req) => {
        // Oturum bilgisini al
        sessionConfig(req, {}, () => {
            const userId = req.session?.userId;
            if (!userId) {
                ws.close();
                console.log('WebSocket connection closed because of no user id')
                return;
            }
            console.log(`User ${userId} connected to WebSocket`);
            clients.set(userId, ws);
            userTopics.set(userId, new Set());

            ws.on('message', (message) => {
                try {
                    const parsedMessage = JSON.parse(message);
                    if (parsedMessage.type === 'joinRoom' && parsedMessage.roomId) {
                        joinRoom(userId, parsedMessage.roomId, req.session);

                    } else if (parsedMessage.type === 'message' && parsedMessage.roomId && parsedMessage.content) {
                        broadcastToRoom(userId, parsedMessage.roomId, parsedMessage.content, req.session);
                    }
                    else if (parsedMessage.type === 'leaveRoom' && parsedMessage.roomId) {
                        leaveRoom(userId, parsedMessage.roomId, req.session);
                    } else {
                        console.warn('Invalid message format:', message);
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            ws.on('close', () => {
                clients.delete(userId);
                userTopics.delete(userId);
                console.log(`User ${userId} disconnected from WebSocket`);
            });
        });
    });

    console.log('WebSocket server started');

    // Bir kullanıcıyı bir topic'e ekleme metodu
    function joinRoom(userId, roomId, session) {

        const userTopicSet = userTopics.get(userId);
        if (userTopicSet) {
            userTopicSet.add(roomId);
        } else {
            userTopics.set(userId, new Set([roomId]));
        }

        console.log(`User ${userId} joined room ${roomId}`);

    }

    // Bir topic'e mesaj yayınlama metodu
    function broadcastToRoom(senderUserId, roomId, content, session) {
        const room = getRoom(roomId);
        if (!room) {
            return;
        }
        const messageToSend = JSON.stringify({
            type: 'message',
            fromUserId: senderUserId,
            content,
            roomId,
            roomName: room.name
        });

        // Mesajı session'a kaydet
        if (!session.messages) {
            session.messages = [];
        }

        session.messages.push({fromUserId: senderUserId, content, roomId, roomName: room.name});

        userTopics.forEach((topicSet, userId) => {
            if (topicSet.has(roomId)) {
                const client = clients.get(userId);
                if (client) {
                    client.send(messageToSend);
                }
            }
        });
    }

    function leaveRoom(userId, roomId, session) {
      const userTopicSet = userTopics.get(userId);
      if (userTopicSet) {
           userTopicSet.delete(roomId);
      }
      console.log(`User ${userId} left room ${roomId}`);

  }

}

module.exports = initializeWebSocketServer;