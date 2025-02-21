const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const users = require('../utils/users');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const messageHistory = [];

const websocketServer = (server) => {
    const wss = new WebSocket.Server({ server });
    const activeConnections = new Map();
    const userStatuses = new Map(); // Kullanıcı durumlarını saklamak için yeni Map

    // Function to send status updates to all connected clients
    const broadcastStatus = (userId, status) => {
        userStatuses.set(userId, status); // Durumu userStatuses Map'ine kaydet
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'status',
                    payload: {
                        userId: userId,
                        status: status,
                    },
                }));
            }
        });
    };


    wss.on('connection', (ws, req) => {
        console.log('WebSocket connection established');

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
                            console.error('WebSocket JWT Verification Error:', err);
                            ws.send(JSON.stringify({ type: 'error', message: 'Invalid or expired token' }));
                            ws.close();
                            return;
                        }

                        userId = decoded.id;
                        activeConnections.set(userId, ws);
                        console.log(`User ${userId} connected via WebSocket`);
                        ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connection authenticated' }));

                        broadcastStatus(userId, 'online');

                        // Yeni eklenen kısım: Başlangıç durumlarını gönder
                        userStatuses.forEach((status, currentUserId) => {
                            if (currentUserId !== userId) { // Kendisinin durumunu tekrar göndermeye gerek yok
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

                    if (recipientConnection && recipientConnection.readyState === WebSocket.OPEN) {
                        recipientConnection.send(JSON.stringify(messagePayload));
                        ws.send(JSON.stringify({ type: 'message-status', message: 'Message sent', to: recipientId }));
                    } else {
                        console.log(`Recipient ${recipientId} is offline, message stored in history.`);
                        ws.send(JSON.stringify({ type: 'message-status', message: 'Recipient offline, message will be delivered when online (and is stored in history)', to: recipientId }));
                    }
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message type' }));
                }

            } catch (error) {
                console.error('WebSocket message parsing error:', error);
                ws.send(JSON.stringify({ type: 'error', message: 'Failed to parse message' }));
            }
        });

        ws.on('close', () => {
            console.log(`WebSocket connection closed for user ${userId}`);
            if (userId) {
                activeConnections.delete(userId);
                broadcastStatus(userId, 'offline');
            }
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            if (userId) {
                activeConnections.delete(userId);
                broadcastStatus(userId, 'offline');
            }
        });
    });

    console.log('WebSocket server started');
};

module.exports = websocketServer;