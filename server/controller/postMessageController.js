const { createMessage, getMessages, deleteMessage } = require('../memory/postMessageStore');
const { v4: uuidv4 } = require('uuid');
const users = require('../utils/users');

const createMessageHandler = async (req, res) => { // Make handler async
    try {
        const { content, contentImage } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content zorunludur.' });
        }

        const userId = req.user.id;

        let usernameFound = null;
        let userProfile = null;

        for (const username in users) {
            if (users[username].id === userId) {
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
            likes: [], // Başlangıçta boş bir like dizisi
            commentCount: 0,
            shareCount: 0
        };

        // Pass req to createMessage so it can access req.user.id
        const createdMessage = await createMessage(req, newMessage); // Await the promise
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: 'Mesaj oluşturulurken bir hata oluştu', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

const getMessageHandler = async (req, res) => { // Make handler async
    try {
        const messages = await getMessages(req); // Await the promise
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Mesajlar alınırken bir hata oluştu', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

const deleteMessageHandler = async (req, res) => { // Make handler async
    try {
        const messageIdToDelete = req.params.id;
        if (!messageIdToDelete) {
            return res.status(400).json({ message: 'Mesaj ID\'si gereklidir.' });
        }

        // Pass req to deleteMessage so it can access req.user.id
        const isDeleted = await deleteMessage(req, messageIdToDelete); // Await the promise
        if (isDeleted) {
            res.status(200).json({ message: 'Mesaj başarıyla silindi.' });
        } else {
            res.status(404).json({ message: 'Mesaj bulunamadı veya silinemedi.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Mesaj silinirken bir hata oluştu', error: error.message, backendMessage: error.message }); // Include backend error message for debugging
    }
};

const likeMessageHandler = async (req, res) => {
    try {
        const messageIdToLike = req.params.id;
        const userId = req.user.id;

        if (!messageIdToLike) {
            return res.status(400).json({ message: 'Mesaj ID\'si gereklidir.' });
        }

        const updatedMessage = await likeMessage(req, messageIdToLike, userId);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Mesaj bulunamadı veya like işlemi başarısız oldu.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Mesaj beğenilirken bir hata oluştu', error: error.message, backendMessage: error.message });
    }
};

const shareMessageHandler = async (req, res) => {
    try {
        const messageIdToShare = req.params.id;

        if (!messageIdToShare) {
            return res.status(400).json({ message: 'Mesaj ID\'si gereklidir.' });
        }

        const updatedMessage = await shareMessage(req, messageIdToShare);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Mesaj bulunamadı veya paylaşım işlemi başarısız oldu.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Mesaj paylaşılırken bir hata oluştu', error: error.message, backendMessage: error.message });
    }
};


module.exports = {
    createMessageHandler,
    getMessageHandler,
    deleteMessageHandler,
    likeMessageHandler,
    shareMessageHandler
};