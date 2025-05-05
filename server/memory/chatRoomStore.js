const crypto = require('crypto');
const users = require('../utils/users');

const rooms = new Map(); 

const topics = [
    "⚽ Sports",
    "🤖 AI",
    "🎨 Art",
    "✈️ Travel",
    "💻 Tech",
    "❤️‍⚕️ Health",
    "🍔 Food",
    "🚀 Space",
    "💡 Startups",
    "₿ Crypto"
];

function createRoom(name, creatorId, topic, imageUrl) {
    const roomId = crypto.randomUUID();
    const createdAt = new Date(); 
    const newRoom = { id: roomId, name, creatorId, supporters: new Set([creatorId]), topic, imageUrl, createdAt }; // Odayı kuran kişi direkt supporter olarak ekleniyor.
    rooms.set(roomId, newRoom);
    return newRoom;
}

function getRoom(roomId) {
    const room = rooms.get(roomId);
    if (!room) {
        return null;
    }

    const supportersWithUsernames = Array.from(room.supporters).map(userId => {
        const username = Object.keys(users).find(key => users[key].id === userId);
        return {
            id: userId,
            username: username || 'Unknown User'
        };
    });

    const roomWithSupporters = {
        ...room,
        supporters: supportersWithUsernames,
        supporterCount: room.supporters.size 
    };
    return roomWithSupporters;
}

function getAllRooms() {
    return Array.from(rooms.values()).map(room => {
      const supportersWithUsernames = Array.from(room.supporters).map(userId => {
          const username = Object.keys(users).find(key => users[key].id === userId);
          return {
              id: userId,
              username: username || 'Unknown User' // Kullanıcı adı bulunamazsa 'Bilinmeyen Kullanıcı' yaz
          };
      });

      return {
        ...room,
        supporters: supportersWithUsernames,
        supporterCount: room.supporters.size  //Add the supporter count
      };
    });
}

function getRoomsByCreator(creatorId) {
    return Array.from(rooms.values())
        .filter(room => room.creatorId === creatorId)
        .map(room => {
            const supportersWithUsernames = Array.from(room.supporters).map(userId => {
                const username = Object.keys(users).find(key => users[key].id === userId);
                return {
                    id: userId,
                    username: username || 'Unknown User' // Kullanıcı adı bulunamazsa 'Bilinmeyen Kullanıcı' yaz
                };
            });

            return {
                ...room,
                supporters: supportersWithUsernames,
                supporterCount: room.supporters.size  //Add the supporter count
            };
        });
}

function getRoomsNotByCreator(userId) { // Function name remains same as requested, but parameter name changed to userId for clarity
    return Array.from(rooms.values())
        .filter(room => !room.supporters.has(userId)) // Changed filter condition to check if userId is NOT a supporter
        .map(room => {
            const supportersWithUsernames = Array.from(room.supporters).map(supporterId => { // Renamed userId to supporterId for clarity in map
                const username = Object.keys(users).find(key => users[key].id === supporterId);
                return {
                    id: supporterId,
                    username: username || 'Unknown User' // Kullanıcı adı bulunamazsa 'Bilinmeyen Kullanıcı' yaz
                };
            });

            return {
                ...room,
                supporters: supportersWithUsernames,
                supporterCount: room.supporters.size  //Add the supporter count
            };
        });
}

function getRoomsBySupporter(userId) {
    return Array.from(rooms.values())
        .filter(room => room.supporters.has(userId))
        .map(room => {
            const supportersWithUsernames = Array.from(room.supporters).map(supporterId => {
                const username = Object.keys(users).find(key => users[key].id === supporterId);
                return {
                    id: supporterId,
                    username: username || 'Unknown User' // Kullanıcı adı bulunamazsa 'Bilinmeyen Kullanıcı' yaz
                };
            });

            return {
                ...room,
                supporters: supportersWithUsernames,
                supporterCount: room.supporters.size  //Add the supporter count
            };
        });
}


function joinRoom(roomId, userId, session) {
    if(!session){
        return false;
    }
    if(!session.joinedRooms){
        session.joinedRooms = [];
    }

    const room = rooms.get(roomId);
    if (!room) {
        return false; // Oda bulunamadı.
    }

    if (!room.supporters.has(userId)) {
        return false; // Kullanıcı supporter değil.
    }


    if (!session.joinedRooms.includes(roomId)) {
        session.joinedRooms.push(roomId);
        return true;
    }
    return false;
}

function leaveRoom(roomId, userId, session) {
    if(!session || !session.joinedRooms){
        return false;
    }

    const room = rooms.get(roomId);
    if (room) {
        const index = session.joinedRooms.indexOf(roomId);
        if (index !== -1) {
            session.joinedRooms.splice(index, 1);
        }
        return true;
    }
    return false;
}

function deleteRoom(roomId) {
    return rooms.delete(roomId);
}

function becomeSupporter(roomId, userId) {
    const room = rooms.get(roomId);
    if (room) {
         if (room.supporters.has(userId)) {
                return null;
            }
        room.supporters.add(userId);
        return true;
    }
    return false;
}


function leaveSupporter(roomId, userId) {
    const room = rooms.get(roomId);
    if(room) {
        room.supporters.delete(userId);
        return true;
    }
     return false;
}

function isValidTopic(topic) {
    return topics.includes(topic);
}


module.exports = {
    createRoom,
    getRoom,
    getAllRooms,
    joinRoom,
    leaveRoom,
    deleteRoom,
    becomeSupporter,
    leaveSupporter,
    topics,  // Expose the topics array
    isValidTopic,
    getRoomsByCreator, // Export new function
    getRoomsNotByCreator, // Export new function
    getRoomsBySupporter // Export new function
};