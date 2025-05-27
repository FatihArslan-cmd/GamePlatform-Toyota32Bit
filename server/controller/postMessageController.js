const { createMessage, getMessages, deleteMessage } = require('../memory/postMessageStore');
const { v4: uuidv4 } = require('uuid');
const users = require('../utils/users');

const createMessageHandler = async (req, res) => {
    try {
        const { content, contentImage } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required.' });
        }

        const userId = req.user.id;

        let usernameFound = null;
        let userProfile = null;

        for (const username in users) {
            if (users[username] && users[username].id === userId) {
                usernameFound = username;
                userProfile = users[username];
                break;
            }
        }

        if (!usernameFound || !userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMessage = {
            id: uuidv4(),
            username: usernameFound,
            userAvatar: userProfile.profilePhoto,
            timePosted: new Date().toISOString(),
            content,
            contentImage,
            initialLikes: 0,
            commentCount: 0,
            shareCount: 0
        };

        const createdMessage = await createMessage(req, newMessage);
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the message', error: error.message, backendMessage: error.message });
    }
};

const getMessageHandler = async (req, res) => {
    try {
        const messages = await getMessages(req);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching messages', error: error.message, backendMessage: error.message });
    }
};

const deleteMessageHandler = async (req, res) => {
    try {
        const messageIdToDelete = req.params.id;

        if (!messageIdToDelete) {
            return res.status(400).json({ message: 'Message ID is required.' });
        }

        const isDeleted = await deleteMessage(req, messageIdToDelete);

        if (isDeleted) {
            res.status(200).json({ message: 'Message deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Message not found or could not be deleted.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the message', error: error.message, backendMessage: error.message });
    }
};

module.exports = {
    createMessageHandler,
    getMessageHandler,
    deleteMessageHandler,
};