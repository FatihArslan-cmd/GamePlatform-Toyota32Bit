const crypto = require('crypto');

const rooms = new Map(); // Map<roomId, { id: string, name: string, creatorId: string, participants: Set<userId> }>

function createRoom(name, creatorId) {
  const roomId = crypto.randomUUID();
  const newRoom = { id: roomId, name, creatorId, participants: new Set() };
  rooms.set(roomId, newRoom);
  return newRoom;
}

function getRoom(roomId) {
  return rooms.get(roomId);
}

function getAllRooms() {
    return Array.from(rooms.values());
}

function joinRoom(roomId, userId, session) {
   if(!session){
       return false
   }
   if(!session.joinedRooms){
       session.joinedRooms = [];
   }
    const room = rooms.get(roomId);
    if (room) {
        room.participants.add(userId);
        if (!session.joinedRooms.includes(roomId)) {
            session.joinedRooms.push(roomId);
        }
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
        room.participants.delete(userId);
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

module.exports = { createRoom, getRoom, getAllRooms, joinRoom, leaveRoom, deleteRoom};