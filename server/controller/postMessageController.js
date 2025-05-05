const { createMessage, getMessages, deleteMessage } = require('../memory/postMessageStore');
const { v4: uuidv4 } = require('uuid');
const users = require('../utils/users'); // Assuming this is where user details are stored

const createMessageHandler = async (req, res) => { // Make handler async
    try {
        const { content, contentImage } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required.' });
        }

        const userId = req.user.id;

        let usernameFound = null;
        let userProfile = null;

        // Find the user details based on userId
        for (const username in users) {
            if (users[username] && users[username].id === userId) { // Added null/undefined check
                usernameFound = username;
                userProfile = users[username];
                break;
            }
        }

        if (!usernameFound || !userProfile) {
            // Assuming 'User not found' is already English, keep it.
            return res.status(404).json({ message: 'User not found' });
        }

        const newMessage = {
            id: uuidv4(),
            username: usernameFound,
            userAvatar: userProfile.profilePhoto,
            timePosted: new Date().toISOString(),
            content,
            contentImage,
            initialLikes: 0, // Assuming these are starting values
            commentCount: 0,
            shareCount: 0
        };

        // Pass req to createMessage so it can access req.user.id (if needed internally for validation/ownership)
        const createdMessage = await createMessage(req, newMessage); // Await the promise
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the message', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

const getMessageHandler = async (req, res) => { // Make handler async
    try {
        const messages = await getMessages(req); // Await the promise
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching messages', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

const deleteMessageHandler = async (req, res) => { // Make handler async
    try {
        const messageIdToDelete = req.params.id;

        if (!messageIdToDelete) {
            return res.status(400).json({ message: 'Message ID is required.' });
        }

        // Pass req to deleteMessage so it can access req.user.id (for authorization checks)
        const isDeleted = await deleteMessage(req, messageIdToDelete); // Await the promise

        if (isDeleted) {
            res.status(200).json({ message: 'Message deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Message not found or could not be deleted.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the message', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

module.exports = {
    createMessageHandler,
    getMessageHandler,
    deleteMessageHandler,
};