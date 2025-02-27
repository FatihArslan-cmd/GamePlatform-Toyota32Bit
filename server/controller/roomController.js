const { createRoom, getRoom, getAllRooms, joinRoom, leaveRoom, deleteRoom, becomeSupporter, leaveSupporter, topics, isValidTopic, getRoomsByCreator, getRoomsNotByCreator, getRoomsBySupporter} = require('../memory/chatRoomStore');
const { isURL } = require('../utils/isURL'); // Import isURL from utils.js



const createRoomHandler = (req, res) => {
    const { name, topic, imageUrl } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Oda adı gereklidir' });
    }

    if (!topic) {
        return res.status(400).json({ message: 'Oda konusu (topic) gereklidir' });
    }

   if (!isValidTopic(topic)) {
        return res.status(400).json({ message: 'Geçersiz oda konusu. Lütfen şu konulardan birini seçin: ' + topics.join(', ') });
    }


    if (!imageUrl) {
        return res.status(400).json({ message: 'Oda resmi (imageUrl) gereklidir' });
    }

    if (!isURL(imageUrl)) {
        return res.status(400).json({ message: 'Geçersiz resim URL\'si' });
    }

    const room = createRoom(name, req.user.id, topic, imageUrl);
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

// Yeni Handler: Kullanıcının yarattığı odaları getir
const getRoomsByMeHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsByCreator(userId);
    res.json(rooms);
};

// Yeni Handler: Kullanıcının yaratmadığı odaları getir
const getRoomsNotByMeHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsNotByCreator(userId);
    res.json(rooms);
};

// Yeni Handler: Kullanıcının supporter olduğu odaları getir
const getRoomsBySupporterHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsBySupporter(userId);
    res.json(rooms);
};


const joinRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    if (joinRoom(roomId, userId, req.session)) {
        res.json({ message: 'Odaya katıldınız' });
    } else {
        res.status(404).json({ message: 'Oda bulunamadı veya zaten katıldınız' });
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

const becomeSupporterHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    const result = becomeSupporter(roomId, userId);

    if(result === true){
        res.json({message: 'Supporter oldunuz'});
    } else if(result === null){
        res.status(400).json({message: 'Zaten supportersiniz'});
    }
    else {
        res.status(404).json({message: 'Oda bulunamadı'});
    }
}

const leaveSupporterHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    if(leaveSupporter(roomId, userId)){
        res.json({message: 'Supporterlıktan ayrıldınız'});
    } else {
        res.status(404).json({message: 'Oda bulunamadı'});
    }
}


module.exports = {
    createRoomHandler,
    getRoomHandler,
    getAllRoomsHandler,
    joinRoomHandler,
    leaveRoomHandler,
    deleteRoomHandler,
    becomeSupporterHandler,
    leaveSupporterHandler,
    getRoomsByMeHandler, // Export new handler
    getRoomsNotByMeHandler, // Export new handler
    getRoomsBySupporterHandler // Export new handler
};