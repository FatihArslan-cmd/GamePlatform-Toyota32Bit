const { sessionStore } = require('../config/sessionConfig');
const users = require('../utils/users'); // users objesini import et

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

const lobbyStore = {
    getLobbiesFromSession: (callback) => {
        sessionStore.get('lobbies', (err, lobbiesData) => {
            if (err) {
                console.error('Session error getting lobbies:', err);
                return callback(err);
            }
            const lobbies = lobbiesData || {}; // Oturumda lobi yoksa boş obje dön
            callback(null, lobbies);
        });
    },

    saveLobbiesToSession: (lobbies, callback) => {
        sessionStore.set('lobbies', lobbies, (err) => {
            if (err) {
                console.error('Session error saving lobbies:', err);
                return callback(err);
            }
            callback(null);
        });
    },

    createLobby: (userId, lobbyName, lobbyType, maxCapacity = 8, gameName = null, password = null, startDate = null, endDate = null, callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            if (lobbies[userId]) {
                return callback(new Error('User already owns a lobby'));
            }

            const userLobby = Object.values(lobbies).find((l) => l.members.some(member => member.id === userId));
            if (userLobby) {
                return callback(new Error('User is already in a lobby. Leave the lobby to create a new one.'));
            }

            if (!['Normal', 'Event'].includes(lobbyType)) {
                return callback(new Error('Invalid lobby type'));
            }

            if (lobbyType === 'Event' && (!startDate || !endDate)) {
                return callback(new Error('Event lobbies require startDate and endDate'));
            }

            const code = Math.random().toString(36).substr(2, 6).toUpperCase();

            const lobby = {
                lobbyName,
                ownerId: userId,
                code,
                members: [getUserDetails(userId)], // Üye listesini kullanıcı detayları objesiyle başlat
                blockedMembers: [],
                maxCapacity,
                lobbyType,
                gameName,
                password,
                startDate: lobbyType === 'Event' ? startDate : null,
                endDate: lobbyType === 'Event' ? endDate : null,
                lastOwnerLeave: null,
                timeout: null, // Timeout session store'da tutulmamalı, gerekirse uygulama içinde yönetilmeli
            };

            lobbies[userId] = lobby;
            lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },

    joinLobby: (userId, code, password = null, callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const userLobby = Object.values(lobbies).find((l) => l.members.some(member => member.id === userId));
            if (userLobby) {
                return callback(new Error('User is already in a lobby. Leave the lobby to join another.'));
            }

            const lobby = Object.values(lobbies).find((l) => l.code === code);

            if (!lobby) {
                return callback(new Error('Lobby not found'));
            }

            if (lobby.password && lobby.password !== password) {
                return callback(new Error('Invalid password'));
            }

            if (lobby.members.length >= lobby.maxCapacity) {
                return callback(new Error('Lobby is full'));
            }

            if (lobby.members.some(member => member.id === userId)) {
                return callback(new Error('User is already in this lobby'));
            }

            if (lobby.ownerId === userId) {
                lobby.lastOwnerLeave = null;
                if (lobby.timeout) {
                    clearTimeout(lobby.timeout); // Timeout session store'da tutulmamalı, gerekirse uygulama içinde yönetilmeli
                    lobby.timeout = null;
                }
            }

            lobby.members.push(getUserDetails(userId)); // Yeni üye detaylarını listeye ekle
            lobbies[lobby.ownerId] = lobby;
            lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },

    leaveLobby: (userId, callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const userLobby = Object.values(lobbies).find((l) => l.members.some(member => member.id === userId));

            if (!userLobby) {
                return callback(new Error('User is not in any lobby'));
            }

            userLobby.members = userLobby.members.filter(member => member.id !== userId); // Üyeyi ID'ye göre filtrele

            if (userLobby.ownerId === userId) {
                if (userLobby.lobbyType === 'Event') {
                    console.log(`Owner left, but lobby is event type and will remain active until ${userLobby.endDate}`);
                } else {
                    userLobby.lastOwnerLeave = Date.now(); // Zaman damgasını ekle
                }
                if(userLobby.members.length === 0) { // Eğer sahibi ayrıldıktan sonra lobi boşsa sil
                    delete lobbies[userId];
                }
            }
             if(userLobby.members.length === 0 && userLobby.ownerId !== userId) { // Eğer üye ayrıldıktan sonra lobi boşsa sil ve sahibi değilse
                    const ownerId = Object.keys(lobbies).find(key => lobbies[key].code === userLobby.code);
                    if(ownerId) delete lobbies[ownerId];
                } else {
                    lobbies[userLobby.ownerId] = userLobby; // Lobby sahibi ID'si ile güncelliyoruz
                }


            lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, userLobby);
            });
        });
    },

    deleteLobby: (userId, callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            if (!lobbies[userId]) {
                return callback(new Error('User does not own any lobby'));
            }

            const lobby = lobbies[userId];
            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can delete the lobby'));
            }

            delete lobbies[userId];
            lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, true); // Başarılı silme durumunda true dönüyoruz
            });
        });
    },

    updateLobby: (userId, updates, callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = lobbies[userId];

            if (!lobby) {
                return callback(new Error('Lobby not found'));
            }

            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can update the lobby'));
            }

            if (updates.lobbyType && !['Normal', 'Event'].includes(updates.lobbyType)) {
                return callback(new Error('Invalid lobby type'));
            }

            if (updates.lobbyType === 'Normal' && lobby.lobbyType === 'Event') {
                lobby.startDate = null;
                lobby.endDate = null;
            }

            if (updates.lobbyType === 'Event' && (!updates.startDate || !updates.endDate)) {
                return callback(new Error('Event lobbies require startDate and endDate'));
            }

            if (updates.addMember) {
                const parsedUserId = parseInt(updates.addMember);
                if(lobby.members.some(member => member.id === parsedUserId)) {
                    return callback(new Error('Member already in lobby'));
                }
                if (lobby.blockedMembers.includes(parsedUserId)) {
                    return callback(new Error('Member is blocked and cannot be added'));
                }
                if (lobby.members.length >= lobby.maxCapacity) {
                    return callback(new Error('Lobby is full'));
                }
                lobby.members.push(getUserDetails(parsedUserId)); // Eklenen üye detaylarını ekle
            }

            if (updates.removeMember) {
                lobby.members = lobby.members.filter(member => member.id !== parseInt(updates.removeMember)); // Çıkarılan üyeyi ID'ye göre filtrele
            }

            if (updates.blockMember) {
                const parsedBlockUserId = parseInt(updates.blockMember);
                if (lobby.members.some(member => member.id === parsedBlockUserId)) {
                    lobby.members = lobby.members.filter(member => member.id !== parsedBlockUserId); // Engellenen üyeyi ID'ye göre filtrele
                }
                if (!lobby.blockedMembers.includes(parsedBlockUserId)) {
                    lobby.blockedMembers.push(parsedBlockUserId);
                }
            }

            if (updates.unblockMember) {
                lobby.blockedMembers = lobby.blockedMembers.filter(memberId => memberId !== parseInt(updates.unblockMember));
            }

            Object.assign(lobby, updates);
            lobbies[userId] = lobby;
            lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },


    getLobbies: (callback) => {
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);
            const lobbiesArray = Object.values(lobbies).map((lobby) => {
                const { password, ...sanitizedLobby } = lobby; // password'u çıkarıyoruz
                return {
                    ...sanitizedLobby,
                     members: lobby.members // Üye listesi zaten detaylarla zenginleştirilmiş durumda
                };
            });
            callback(null, lobbiesArray);
        });
    },

    cleanupInactiveLobbies: () => { // Yeni temizlik fonksiyonu
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) {
                return console.error('Error cleaning up inactive lobbies:', err);
            }

            const now = Date.now();
            const timeoutDuration = 8 * 60 * 60 * 1000; // 8 saat

            let updated = false;
            Object.keys(lobbies).forEach(ownerId => {
                const lobby = lobbies[ownerId];
                if (lobby.lobbyType === 'Normal' && lobby.lastOwnerLeave) { // Normal lobi ve lastOwnerLeave varsa
                    if (now - lobby.lastOwnerLeave >= timeoutDuration) { // 8 saat geçmiş mi?
                        delete lobbies[ownerId];
                        updated = true;
                        console.log(`Normal lobby ${lobby.lobbyName} owned by ${ownerId} has been deleted due to inactivity timeout.`);
                    }
                }
            });

            if (updated) {
                lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {
                        console.error('Error saving lobbies after inactive cleanup:', err);
                    }
                });
            }
        });
    },

    cleanupEventLobbies: () => { // Mevcut event lobi temizliği (değişiklik yok)
        lobbyStore.getLobbiesFromSession((err, lobbies) => {
            if (err) {
                return console.error('Error cleaning up event lobbies:', err);
            }

            let updated = false;
            const now = Date.now();
            Object.keys(lobbies).forEach(ownerId => {
                const lobby = lobbies[ownerId];
                if (lobby.lobbyType === 'Event' && new Date(lobby.endDate).getTime() <= now) {
                    delete lobbies[ownerId];
                    updated = true;
                    console.log(`Event lobby ${lobby.lobbyName} owned by ${ownerId} has been deleted due to end date.`);
                }
            });

            if (updated) {
                lobbyStore.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {
                        console.error('Error saving lobbies after cleanup:', err);
                    }
                });
            }
        });
    },
};


setInterval(lobbyStore.cleanupEventLobbies, 60 * 1000); // Event lobileri için mevcut interval
setInterval(lobbyStore.cleanupInactiveLobbies, 60 * 1000); // Yeni inactive lobi temizliği için interval (ayrı veya birleştirilebilir)

module.exports = lobbyStore;