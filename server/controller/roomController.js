const { createRoom, getRoom, getAllRooms, joinRoom, leaveRoom, deleteRoom, becomeSupporter, leaveSupporter, topics, isValidTopic, getRoomsByCreator, getRoomsNotByCreator, getRoomsBySupporter} = require('../memory/chatRoomStore');
const { isURL } = require('../utils/isURL'); 

const createRoomHandler = (req, res) => {
    const { name, topic, imageUrl } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Room name is required' });
    }

    if (!topic) {
        return res.status(400).json({ message: 'Room topic is required' });
    }

   if (!isValidTopic(topic)) {
        return res.status(400).json({ message: 'Invalid room topic. Please select one of the following topics: ' + topics.join(', ') });
    }


    if (!imageUrl) {
        return res.status(400).json({ message: 'Room image URL is required' });
    }

    if (!isURL(imageUrl)) {
        return res.status(400).json({ message: 'Invalid image URL' });
    }

    const room = createRoom(name, req.user.id, topic, imageUrl);
    res.status(201).json(room);
};

const getRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const room = getRoom(roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
};

const getAllRoomsHandler = (req, res) => {
    const rooms = getAllRooms();
    res.json(rooms);
};

const getRoomsByMeHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsByCreator(userId);
    res.json(rooms);
};

const getRoomsNotByMeHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsNotByCreator(userId);
    res.json(rooms);
};

const getRoomsBySupporterHandler = (req, res) => {
    const userId = req.user.id;
    const rooms = getRoomsBySupporter(userId);
    res.json(rooms);
};


const joinRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    if (joinRoom(roomId, userId, req.session)) {
        res.json({ message: 'Joined room successfully' });
    } else {
        res.status(404).json({ message: 'Room not found or you have already joined' });
    }
};

const leaveRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    if(leaveRoom(roomId, userId, req.session)){
        res.json({ message: 'Left room successfully' });
    } else {
        res.status(404).json({ message: 'Room not found or you are not in this room' });
    }
};

const deleteRoomHandler = (req, res) => {
    const { roomId } = req.params;
    const room = getRoom(roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    if (room.creatorId !== req.user.id) {
        return res.status(403).json({ message: 'You do not have permission to delete this room' });
    }

    if(deleteRoom(roomId)){
        res.json({ message: 'Room deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'Room not found' });
    }
};

const becomeSupporterHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    const result = becomeSupporter(roomId, userId);

    if(result === true){
        res.json({message: 'Became a supporter'});
    } else if(result === null){
        res.status(400).json({message: 'You are already a supporter'});
    }
    else {
        res.status(404).json({message: 'Room not found'});
    }
}

const leaveSupporterHandler = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    if(leaveSupporter(roomId, userId)){
        res.json({message: 'Left supporter role'});
    } else {
        res.status(404).json({message: 'Room not found or you are not a supporter'});
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
    getRoomsByMeHandler,
    getRoomsNotByMeHandler,
    getRoomsBySupporterHandler
};