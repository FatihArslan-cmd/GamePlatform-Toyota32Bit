const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const users = require('../utils/users'); // users.js dosyasını içe aktar
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const messageHistory = []; // Mesaj geçmişini saklamak için dizi

const websocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    // Aktif kullanıcı bağlantılarını saklamak için bir obje (userId -> WebSocket)
    const activeConnections = new Map();

    wss.on('connection', (ws, req) => {
        console.log('WebSocket connection established');

        let userId; // Bağlanan kullanıcının ID'si

        ws.on('message', async (message) => { // Make message handler async to use await with sessionStore
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
                        activeConnections.set(userId, ws); // Kullanıcı ID'si ile bağlantıyı kaydet
                        console.log(`User ${userId} connected via WebSocket`);
                        ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connection authenticated' }));

                        // Kullanıcı bağlandığında mesaj geçmişini gönder
                        console.log(`Sending message history to user ${userId}`);
                        messageHistory.forEach(message => {
                            // İsteğe bağlı olarak, sadece bu kullanıcıya veya genel mesajları filtreleyebilirsiniz
                            // Örneğin, mesaj.to === userId veya genel mesajlar için farklı bir yapı kullanabilirsiniz.
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
                    const recipientConnection = activeConnections.get(recipientId); // Alıcı kullanıcının bağlantısını al

                    const messagePayload = {
                        type: 'message',
                        payload: {
                            from: userId,
                            to: recipientId,
                            content,
                            timestamp: new Date().toISOString(),
                        },
                    };

                    messageHistory.push(messagePayload); // Mesajı mesaj geçmişine kaydet

                    if (recipientConnection && recipientConnection.readyState === WebSocket.OPEN) {
                        recipientConnection.send(JSON.stringify(messagePayload));
                        ws.send(JSON.stringify({ type: 'message-status', message: 'Message sent', to: recipientId })); // Gönderene mesaj durumu bildirimi
                    } else {
                        // Alıcı çevrimdışı olsa bile mesaj zaten messageHistory'e kaydedildi.
                        // Artık sessionStore'a kaydetmeye gerek yok.
                        console.log(`Recipient ${recipientId} is offline, message stored in history.`);
                        ws.send(JSON.stringify({ type: 'message-status', message: 'Recipient offline, message will be delivered when online (and is stored in history)', to: recipientId })); // Gönderene mesaj durumu bildirimi
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
                activeConnections.delete(userId); // Kullanıcı ayrıldığında bağlantıyı sil
            }
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            if (userId) {
                activeConnections.delete(userId); // Hata durumunda bağlantıyı sil
            }
        });
    });

    console.log('WebSocket server started');
};

module.exports = websocketServer;