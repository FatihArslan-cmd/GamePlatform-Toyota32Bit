const crypto = require('crypto');

const rooms = new Map(); // Map<roomId, { id: string, name: string, creatorId: string, supporters: Set<userId> }>

function createRoom(name, creatorId) {
    const roomId = crypto.randomUUID();
    const newRoom = { id: roomId, name, creatorId, supporters: new Set([creatorId]) }; // Odayı kuran kişi direkt supporter olarak ekleniyor.
    rooms.set(roomId, newRoom);
    return newRoom;
}

function getRoom(roomId) {
    const room = rooms.get(roomId);
    if (!room) {
        return null;
    }
    // Supporter'ları ID listesi olarak döndür
    const roomWithSupporters = {
        ...room,
        supporters: Array.from(room.supporters)
    };
    return roomWithSupporters;
}

function getAllRooms() {
    return Array.from(rooms.values()).map(room => ({
      ...room,
        supporters: Array.from(room.supporters)
    }));
}


function joinRoom(roomId, userId, session) {
    if(!session){
        return false
    }
    if(!session.joinedRooms){
        session.joinedRooms = [];
    }
    const room = rooms.get(roomId);
    if (room && !session.joinedRooms.includes(roomId)) {
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
                return null; // Kullanıcı zaten supporter
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

module.exports = { createRoom, getRoom, getAllRooms, joinRoom, leaveRoom, deleteRoom, becomeSupporter, leaveSupporter };