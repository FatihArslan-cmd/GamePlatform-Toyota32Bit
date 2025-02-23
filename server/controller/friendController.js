const crypto = require('crypto');
const users = require('../utils/users');
const { sessionStore } = require('../config/sessionConfig');

const friendCodes = {};

const generateFriendCode = (req, res) => {
    const userId = req.user.id;
    const now = Date.now();
    const limitDuration = 60 * 1000;
    const maxRequests = 3;

    sessionStore.get(userId, (err, session) => {
        if (err) {
            console.error('Session error', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const requestCounts = session?.requestCounts || { generateFriendCode: [] };

        requestCounts.generateFriendCode = requestCounts.generateFriendCode.filter(timestamp => timestamp > now - limitDuration)

        if (requestCounts.generateFriendCode.length >= maxRequests) {
            return res.status(429).json({ message: `Too many requests. Please try again in ${Math.ceil((requestCounts.generateFriendCode[0] - (now - limitDuration)) / 1000)} seconds.` });
        }

        requestCounts.generateFriendCode.push(now);

        // Önceki kodları silme mekanizması
        for (const code in friendCodes) {
            if (friendCodes[code].userId === userId) {
                delete friendCodes[code]; // Kullanıcının önceki kodunu sil
            }
        }

        const code = crypto.randomBytes(4).toString('hex');
        const expiresAt = Date.now() + 5 * 60 * 1000; // Kodun geçerlilik süresi (5 dakika)
        friendCodes[code] = { userId, expiresAt };

        sessionStore.set(userId, { ...session, requestCounts }, (err) => {
            if (err) {
                console.error('Session error', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json({
                message: 'Friend code generated',
                friendCode: code,
            });
        });
    });
};
const addFriend = (req, res) => {
    const currentUserId = req.user.id;
    const { friendCode } = req.body;

    if (!friendCode) {
        return res.status(400).json({ message: 'Friend code required.' });
    }

    sessionStore.get(currentUserId, (err, session) => {
        if (err) {
            console.error('Session error', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        const codeData = friendCodes[friendCode]

        if (!codeData) return res.status(404).json({ message: 'Invalid friend code' })

        if (codeData.expiresAt < Date.now()) {
            delete friendCodes[friendCode]; // Süresi dolmuş kodu temizle
            return res.status(410).json({ message: 'Friend code expired.' });
        }

        const targetUserId = codeData.userId;
        if (currentUserId === targetUserId) {
            return res.status(400).json({ message: 'You cannot add yourself as a friend' })
        }

        const friendLists = session?.friendLists || {};

        friendLists[currentUserId] = friendLists[currentUserId] || [];
        friendLists[targetUserId] = friendLists[targetUserId] || [];


        if (friendLists[currentUserId].includes(targetUserId)) {
            return res.status(409).json({ message: 'This user is already your friend' })
        }
        friendLists[currentUserId].push(targetUserId);
        friendLists[targetUserId].push(currentUserId)
        delete friendCodes[friendCode];

        sessionStore.set(currentUserId, { ...session, friendLists }, (err) => {
            if (err) {
                console.error('Session error', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            sessionStore.get(targetUserId, (err, targetSession) => {
                if (err) {
                    console.error('Session error', err)
                    return res.status(500).json({ message: 'Internal server error' })
                }

                sessionStore.set(targetUserId, { ...targetSession, friendLists }, (err) => {
                    if (err) {
                        console.error('Session error', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Friend added successfully.' });
                })
            })
        });
    });
};

const getUserFriends = (req, res) => {
    const userId = req.user.id;
    sessionStore.get(userId, (err, session) => {
        if (err) {
            console.error('Session error', err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
        const friendLists = session?.friendLists || {};

        const friendIds = friendLists[userId] || [];
        const friends = friendIds.map(friendId => {
            for (const username in users) {
                if (users[username].id === friendId) {
                    return {
                        username,
                        id: friendId,
                        profilePhoto: users[username].profilePhoto,
                    }
                }
            }
            return null;
        }).filter(Boolean);

        res.status(200).json({ friends });

    })
};
const removeFriend = (req, res) => {
    const currentUserId = req.user.id;
    const targetUserId = parseInt(req.params.targetUserId);

    sessionStore.get(currentUserId, (err, session) => {
        if (err) {
            console.error('Session error', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        const friendLists = session?.friendLists || {};

        if (!friendLists[currentUserId] || !friendLists[targetUserId]) {
            return res.status(404).json({ message: 'Friend not found.' });
        }
        friendLists[currentUserId] = friendLists[currentUserId].filter(id => id !== targetUserId)
        friendLists[targetUserId] = friendLists[targetUserId].filter(id => id !== currentUserId)

        sessionStore.set(currentUserId, { ...session, friendLists }, (err) => {
            if (err) {
                console.error('Session error', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            sessionStore.get(targetUserId, (err, targetSession) => {
                if (err) {
                    console.error('Session error', err)
                    return res.status(500).json({ message: 'Internal Server Error' })
                }

                sessionStore.set(targetUserId, { ...targetSession, friendLists }, (err) => {
                    if (err) {
                        console.error('Session error', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Friend removed successfully.' });
                })
            })
        });
    });
};


module.exports = { generateFriendCode, addFriend, getUserFriends, removeFriend };