const users = require('./users');

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
    return null; 
};

module.exports = {
    getUserDetails: getUserDetails
};