// Backend (RoomChatWebsocketHandler.js) - UPDATED
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getRoom } = require('../memory/chatRoomStore');
const users = require('../utils/users'); // varsayımsal kullanıcı verisi

const SECRET_KEY = process.env.SECRET_KEY;
const roomConnections = new Map();

function RoomChatWebsocketHandler(ws, request) {
    const roomId = request.url.split('?roomId=')[1];
    let userId = null;

    if (!roomId) {
        console.log("RoomChatWebsocket: Oda ID belirtilmedi.");
        ws.close();
        return;
    }

    const room = getRoom(roomId);
    if (!room) {
        console.log(`RoomChatWebsocket: Oda bulunamadı: ${roomId}`);
        ws.close();
        return;
    }

    ws.on('message', message => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.error("RoomChatWebsocket: Mesaj ayrıştırma hatası:", error);
            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz mesaj formatı' }));
            return;
        }

        if (parsedMessage.type === 'auth') {
            const token = parsedMessage.token;
            if (!token) {
                ws.send(JSON.stringify({ type: 'error', message: 'Kimlik doğrulama tokeni gerekli' }));
                ws.close();
                return;
            }

            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.error('RoomChatWebsocket: JWT Doğrulama Hatası:', err);
                    ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz veya süresi dolmuş token' }));
                    ws.close();
                    return;
                }

                userId = decoded.id;
                if (!roomConnections.has(roomId)) {
                    roomConnections.set(roomId, new Set());
                }
                roomConnections.get(roomId).add(ws);

                console.log(`RoomChatWebsocket: Kullanıcı doğrulandı, Oda ID: ${roomId}, Kullanıcı ID: ${userId}`);
                ws.send(JSON.stringify({ type: 'auth-success', message: 'Kimlik doğrulama başarılı', userId: userId }));

                ws.on('message', handleRoomMessage);
                ws.removeAllListeners('message');
                ws.on('message', handleRoomMessage);


            });
        } else {
            ws.send(JSON.stringify({ type: 'error', message: 'Kimlik doğrulama mesajı bekleniyor' }));
            ws.close();
            return;
        }
    });


    function handleRoomMessage(message) {
        if (userId === null) {
            console.log("RoomChatWebsocket: Kullanıcı kimliği doğrulanmamış, mesaj işlenemiyor.");
            return;
        }

        let messageData;
        try {
            messageData = JSON.parse(message);
        } catch (e) {
            messageData = { type: 'message', text: message.toString() };
        }

        if (messageData.type === 'message') {
            // Find username from users object keys based on userId
            let senderUsername = 'Bilinmeyen Kullanıcı';
            let senderProfilePhoto = null;

            for (const username in users) {
                if (users[username].id === userId) {
                    senderUsername = username; // Username is the key in users object
                    senderProfilePhoto = users[username].profilePhoto;
                    break; // Stop after finding the user
                }
            }


            const messagePayload = {
                type: 'message',
                text: messageData.text,
                senderId: userId,
                senderUsername: senderUsername,
                senderProfilePhoto: senderProfilePhoto, // Profil fotoğrafını mesaja ekle
                roomId: roomId,
                timestamp: new Date().toISOString()
            };
            broadcastMessage(roomId, JSON.stringify(messagePayload));
        } else {
            ws.send(JSON.stringify({ type: 'error', message: 'Geçersiz mesaj tipi, sadece "message" tipi destekleniyor.' }));
        }
    }


    ws.on('close', () => {
        console.log(`RoomChatWebsocket: Bağlantı kapatıldı, Oda ID: ${roomId}, Kullanıcı ID: ${userId}`);
        if (roomConnections.has(roomId)) {
            roomConnections.get(roomId).delete(ws);
            if (roomConnections.get(roomId).size === 0) {
                roomConnections.delete(roomId);
            }
        }
    });

    ws.on('error', error => {
        console.error(`RoomChatWebsocket: Hata, Oda ID: ${roomId}, Kullanıcı ID: ${userId}, Hata: ${error}`);
        if (roomConnections.has(roomId)) {
            roomConnections.get(roomId).delete(ws);
        }
    });

    function broadcastMessage(roomId, message) {
        const roomSockets = roomConnections.get(roomId);
        if (roomSockets) {
            roomSockets.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(message);
                }
            });
        } else {
            console.log(`RoomChatWebsocket: Oda için aktif bağlantı bulunamadı: ${roomId}`);
        }
    }

    console.log('RoomChatWebsocket: Handler başlatıldı.');
}

module.exports = RoomChatWebsocketHandler;