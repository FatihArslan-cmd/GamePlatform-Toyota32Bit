const { createRoom, getRoom, getAllRooms, joinRoom, leaveRoom, deleteRoom} = require('../memory/chatRoomStore');

const createRoomHandler = (req, res) => {
  const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Oda adı gereklidir' });
    }
  const room = createRoom(name, req.user.id);
  res.status(201).json(room);
};

const getRoomHandler = (req, res) => {
  const { roomId } = req.params;
  const room = getRoom(roomId);
  if (!room) {
    return res.status(404).json({ message: 'Oda bulunamadı' });
  }
  res.json(room);
};

const getAllRoomsHandler = (req, res) => {
  const rooms = getAllRooms();
  res.json(rooms);
};

const joinRoomHandler = (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;
    if (joinRoom(roomId, userId, req.session)) {
        res.json({ message: 'Odaya katıldınız' });
    } else {
        res.status(404).json({ message: 'Oda bulunamadı' });
    }
};

const leaveRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    if(leaveRoom(roomId, userId, req.session)){
        res.json({ message: 'Odadan ayrıldınız' });
    } else {
        res.status(404).json({ message: 'Oda bulunamadı' });
    }
};

const deleteRoomHandler = (req, res) => {
  const { roomId } = req.params;
  const room = getRoom(roomId);
  if (!room) {
    return res.status(404).json({ message: 'Oda bulunamadı' });
  }
    if (room.creatorId !== req.user.id) {
        return res.status(403).json({ message: 'Bu odayı silme yetkiniz yok' });
    }

  if(deleteRoom(roomId)){
        res.json({ message: 'Oda silindi' });
  }
   else {
      res.status(404).json({ message: 'Oda bulunamadı' });
   }
};

module.exports = {
  createRoomHandler,
  getRoomHandler,
  getAllRoomsHandler,
  joinRoomHandler,
  leaveRoomHandler,
  deleteRoomHandler
};