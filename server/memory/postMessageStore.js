const { sessionStore } = require('../config/sessionConfig'); // Import sessionStore

const createMessage = (req, messageData) => {
    const userId = req.user.id; // Get userId from req.user
    return new Promise((resolve, reject) => {
        sessionStore.get(userId, (err, session) => {
            if (err) {
                console.error('Session error in createMessage:', err);
                return reject(err);
            }

            let messages = session?.messages || []; // Get messages from session or initialize empty array
            messages.push(messageData); // Push new message
            sessionStore.set(userId, { ...session, messages }, (err) => { // Update session with new messages
                if (err) {
                    console.error('Session set error in createMessage:', err);
                    return reject(err);
                }
                resolve(messageData); // Resolve with the created message
            });
        });
    });
};

const getMessages = (req) => {
    const userId = req.user.id; 
    return new Promise((resolve, reject) => {
        sessionStore.get(userId, (err, session) => {
            if (err) {
                console.error('Session error in getMessages:', err);
                return reject(err);
            }
            const messages = session?.messages || []; 
            resolve(messages); 
        });
    });
};

const deleteMessage = (req, messageId) => {
    const userId = req.user.id; // Get userId from req.user
    return new Promise((resolve, reject) => {
        sessionStore.get(userId, (err, session) => {
            if (err) {
                console.error('Session error in deleteMessage:', err);
                return reject(err);
            }

            let messages = session?.messages || []; // Get messages from session or initialize empty array
            const initialLength = messages.length;
            messages = messages.filter(msg => msg.id !== messageId); // Filter out the message to delete

            if (messages.length !== initialLength) { // Check if a message was actually deleted
                sessionStore.set(userId, { ...session, messages }, (err) => { // Update session with filtered messages
                    if (err) {
                        console.error('Session set error in deleteMessage:', err);
                        return reject(err);
                    }
                    resolve(true); // Resolve with true if deleted
                });
            } else {
                resolve(false); // Resolve with false if not deleted (not found)
            }
        });
    });
};

module.exports = {
    createMessage,
    getMessages,
    deleteMessage,
};