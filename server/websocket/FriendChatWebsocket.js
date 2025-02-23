const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const messageHistory = [];
const activeConnections = new Map();
const userStatuses = new Map();

const broadcastStatus = (userId, status) => {
    userStatuses.set(userId, status);
    activeConnections.forEach((ws, id) => {
        if (ws.readyState === ws.OPEN) { // ws.OPEN kullanıldı (WebSocket.OPEN yerine)
            ws.send(JSON.stringify({
                type: 'status',
                payload: {
                    userId: userId,
                    status: status,
                },
            }));
        }
    });
};

function FriendChatWebsocketHandler(ws, request) {
    console.log('FriendChatWebsocket: Bağlantı kuruldu');

    let userId;

    ws.on('message', async (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === 'auth') {
                const token = parsedMessage.token;
                if (!token) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Authentication token is required' }));
                    ws.close();
                    return;
                }

                jwt.verify(token, SECRET_KEY, (err, decoded) => {
                    if (err) {
                        console.error('FriendChatWebsocket: JWT Verification Error:', err);
                        ws.send(JSON.stringify({ type: 'error', message: 'Invalid or expired token' }));
                        ws.close();
                        return;
                    }

                    userId = decoded.id;
                    activeConnections.set(userId, ws);
                    console.log(`FriendChatWebsocket: User ${userId} connected via WebSocket`);
                    ws.send(JSON.stringify({
                        type: 'connected',
                        message: 'WebSocket connection authenticated',
                        payload: {
                            userId: userId,
                        },
                    }));
                    broadcastStatus(userId, 'online');

                    userStatuses.forEach((status, currentUserId) => {
                        if (currentUserId !== userId) {
                            ws.send(JSON.stringify({
                                type: 'status',
                                payload: {
                                    userId: currentUserId,
                                    status: status,
                                },
                            }));
                        }
                    });

                    messageHistory.forEach(message => {
                        ws.send(JSON.stringify(message));
                    });
                });
            } else if (parsedMessage.type === 'message') {
                if (!userId) {
                    ws.send(JSON.stringify({ type: 'error', message: 'User not authenticated' }));
                    return;
                }

                const { to, content } = parsedMessage.payload;
                if (!to || !content) {
                    return ws.send(JSON.stringify({ type: 'error', message: 'Recipient ID and message content are required' }));
                }

                const recipientId = parseInt(to);
                const recipientConnection = activeConnections.get(recipientId);

                const messagePayload = {
                    type: 'message',
                    payload: {
                        from: userId,
                        to: recipientId,
                        content,
                        timestamp: new Date().toISOString(),
                    },
                };

                messageHistory.push(messagePayload);

                if (recipientConnection && recipientConnection.readyState === ws.OPEN) { // ws.OPEN kullanıldı
                    recipientConnection.send(JSON.stringify(messagePayload));
                    ws.send(JSON.stringify({ type: 'message-status', message: 'Message sent', to: recipientId }));
                } else {
                    console.log(`FriendChatWebsocket: Recipient ${recipientId} is offline, message stored in history.`);
                    ws.send(JSON.stringify({ type: 'message-status', message: 'Recipient offline, message will be delivered when online (and is stored in history)', to: recipientId }));
                }
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Invalid message type' }));
            }

        } catch (error) {
            console.error('FriendChatWebsocket: WebSocket message parsing error:', error);
            ws.send(JSON.stringify({ type: 'error', message: 'Failed to parse message' }));
        }
    });

    ws.on('close', () => {
        console.log(`FriendChatWebsocket: WebSocket connection closed for user ${userId}`);
        if (userId) {
            activeConnections.delete(userId);
            broadcastStatus(userId, 'offline');
        }
    });

    ws.on('error', (error) => {
        console.error('FriendChatWebsocket: WebSocket error:', error);
        if (userId) {
            activeConnections.delete(userId);
            broadcastStatus(userId, 'offline');
        }
    });

    console.log('FriendChatWebsocket: Handler başlatıldı.');
}

module.exports = FriendChatWebsocketHandler;