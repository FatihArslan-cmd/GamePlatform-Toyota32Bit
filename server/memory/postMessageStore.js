const { sessionStore } = require('../config/sessionConfig');

let globalMessages = [];

const createMessage = (req, messageData) => {
    const userId = req.user.id;
    return new Promise((resolve, reject) => {
        sessionStore.get(userId, (err, session) => {
            if (err) {
                console.error('Session error in createMessage:', err);
                return reject(err);
            }

            let messages = session?.messages || [];
            messages.push(messageData);
            sessionStore.set(userId, { ...session, messages }, (err) => {
                if (err) {
                    console.error('Session set error in createMessage:', err);
                    return reject(err);
                }
                globalMessages.push(messageData);
                resolve(messageData);
            });
        });
    });
};

const getMessages = (req) => {
    return new Promise((resolve, reject) => {
        resolve(globalMessages); 
    });
};

const deleteMessage = (req, messageId) => {
    const userId = req.user.id;
    return new Promise((resolve, reject) => {
        sessionStore.get(userId, (err, session) => {
            if (err) {
                console.error('Session error in deleteMessage:', err);
                return reject(err);
            }

            let messages = session?.messages || [];
            const initialLength = messages.length;
            messages = messages.filter(msg => msg.id !== messageId);

            if (messages.length !== initialLength) {
                sessionStore.set(userId, { ...session, messages }, (err) => {
                    if (err) {
                        console.error('Session set error in deleteMessage:', err);
                        return reject(err);
                    }
                    globalMessages = globalMessages.filter(msg => msg.id !== messageId);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        });
    });
};

module.exports = {
    createMessage,
    getMessages,
    deleteMessage,
};