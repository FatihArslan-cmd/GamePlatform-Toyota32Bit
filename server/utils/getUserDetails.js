const users = require('./users'); // users objesini import et (adjust path if needed)

const getUserDetails = (userId) => {
    for (const username in users) {
        if (users[username].id === userId) {
            return {
                id: userId,
                username: username,
                profilePhoto: users[username].profilePhoto,
            };
        }
    }
    return null; // Kullanıcı bulunamazsa null dön
};

module.exports = {
    getUserDetails: getUserDetails
};