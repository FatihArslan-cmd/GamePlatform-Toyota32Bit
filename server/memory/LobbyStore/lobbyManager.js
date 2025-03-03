const { sessionStore } = require('../../config/sessionConfig');
const users = require('../../utils/users'); // users objesini import et
const { getUserDetails } = require('../../utils/getUserDetails'); // Import getUserDetails from usersUtil


const lobbyManager = {
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

    createLobby: (userId, lobbyName, lobbyType, maxCapacity = 8, gameName = null, password = null, startDate = null, endDate = null, hasPassword = false, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
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

            if (lobbyType === 'Event') {
                if (!startDate || !endDate) {
                    return callback(new Error('Event lobbies require startDate and endDate'));
                }

                const start = new Date(startDate);
                const end = new Date(endDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Saat, dakika, saniye ve milisaniyeyi sıfırla, sadece tarihi karşılaştır

                if (start > end) {
                    return callback(new Error('Start date cannot be after end date'));
                }

                if (start < today) {
                    return callback(new Error('Start date cannot be before today'));
                }
            }

            const code = Math.random().toString(36).substr(2, 6).toUpperCase();

            const lobby = {
                lobbyName,
                ownerId: userId,
                ownerUsername: getUserDetails(userId).username,
                code,
                members: [getUserDetails(userId)],
                blockedMembers: [],
                maxCapacity,
                lobbyType,
                gameName,
                password,
                startDate: lobbyType === 'Event' ? startDate : null,
                endDate: lobbyType === 'Event' ? endDate : null,
                lastOwnerLeave: null,
                timeout: null, // Timeout session store'da tutulmamalı, gerekirse uygulama içinde yönetilmeli
                hasPassword: hasPassword, // Yeni alan eklendi
                gameStarted: false
            };

            lobbies[userId] = lobby;
            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },

    joinLobby: (userId, code, options, callback) => {
        const { password = null, isInvite = false } = options;

        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const userLobby = Object.values(lobbies).find((l) => l.members.some(member => member.id === userId));
            if (userLobby) {
                return callback(new Error('User is already in a lobby. Leave the lobby to join another.'));
            }

            const lobby = Object.values(lobbies).find((l) => l.code === code);

            if (!lobby) {
                return callback(new Error('Lobby not found'));
            }

            if (lobby.gameStarted) {
                return callback(new Error('Cannot join. Game has already started in this lobby.'));
            }

            if (lobby.blockedMembers.includes(userId)) {
                return callback(new Error('You are blocked from joining this lobby.'));
            }

            // Şifre kontrolünü sadece davet değilse yap
            if (!isInvite && lobby.hasPassword && lobby.password !== password) { // hasPassword kontrolü eklendi
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
                    clearTimeout(lobby.timeout);
                    lobby.timeout = null;
                }
            }

            lobby.members.push(getUserDetails(userId));
            lobbies[lobby.ownerId] = lobby;

            // Invitation temizleme işlemini burada yapıyoruz - Moved to lobbyInvitationManager.js for better separation of concerns
            // sessionStore.get(userId, (sessionErr, userSession) => { ... });

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });

        });
    },


    leaveLobby: (userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
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
                if (userLobby.members.length === 0) { // Eğer sahibi ayrıldıktan sonra lobi boşsa sil
                    delete lobbies[userId];
                }
            }
            if (userLobby.members.length === 0 && userLobby.ownerId !== userId) { // Eğer üye ayrıldıktan sonra lobi boşsa sil ve sahibi değilse
                const ownerId = Object.keys(lobbies).find(key => lobbies[key].code === userLobby.code);
                if (ownerId) delete lobbies[ownerId];
            } else {
                lobbies[userLobby.ownerId] = userLobby; // Lobby sahibi ID'si ile güncelliyoruz
            }


            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, userLobby);
            });
        });
    },

    deleteLobby: (userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            if (!lobbies[userId]) {
                return callback(new Error('User does not own any lobby'));
            }

            const lobby = lobbies[userId];
            if (lobby.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can delete the lobby'));
            }

            const deletedLobbyCode = lobby.code; // Silinen lobinin kodunu al

            delete lobbies[userId]; // Lobiyi sil

            sessionStore.all((err, sessions) => { // Tüm oturumları al
                if (err) {
                    console.error('Error getting all sessions:', err);
                    return callback(err); // Oturumları alırken hata olursa callback ile hatayı döndür
                }

                let updatedSessions = 0;
                for (const sessionId in sessions) {
                    const session = sessions[sessionId];
                    if (session && session.lobbyInvitations) { // Oturumda lobbyInvitations varsa
                        let invitations = session.lobbyInvitations;
                        const initialInvitationCount = invitations.length;
                        invitations = invitations.filter(invite => invite.lobbyCode !== deletedLobbyCode); // Silinen lobiye ait davetleri filtrele
                        if (invitations.length !== initialInvitationCount) { // Eğer davetler silindiyse oturumu güncelle
                            session.lobbyInvitations = invitations;
                            sessionStore.set(sessionId, session, (err) => { // Oturumu güncelle
                                if (err) {
                                    console.error('Error updating session after lobby deletion:', err);
                                    // Oturum güncelleme hatasını burada nasıl yöneteceğinize karar verin.
                                    // Belki hatayı callback'e döndürmek veya sadece loglamak istersiniz.
                                } else {
                                    updatedSessions++;
                                }
                            });
                        }
                    }
                }
                console.log(`Lobby ${lobby.lobbyName} and related invitations cleaned up from ${updatedSessions} user sessions.`);
                lobbyManager.saveLobbiesToSession(lobbies, (err) => { // Güncellenmiş lobi listesini kaydet
                    if (err) return callback(err);
                    callback(null, true); // Başarılı silme durumunda true dönüyoruz
                });
            });
        });
    },

    updateLobby: (userId, updates, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
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
                if (lobby.members.some(member => member.id === parsedUserId)) {
                    return callback(new Error('Member already in lobby'));
                }
                if (lobby.blockedMembers.includes(parsedUserId)) {
                    return callback(new Error('Member is blocked and cannot be added'));
                }
                if (lobby.members.length >= lobby.maxCapacity) {
                    return callback(new Error('Lobby is full'));
                }
                lobby.members.push(getUserDetails(parsedUserId));
            }

            if (updates.removeMember) {
                const parsedUserId = parseInt(updates.removeMember);
                if (parsedUserId === lobby.ownerId) {
                    return callback(new Error('Lobby owner cannot kick themselves'));
                }
                lobby.members = lobby.members.filter(member => member.id !== parsedUserId);
            }

            if (updates.blockMember) {
                const parsedBlockUserId = parseInt(updates.blockMember);
                if (parsedBlockUserId === lobby.ownerId) {
                    return callback(new Error('Lobby owner cannot block themselves'));
                }
                if (lobby.members.some(member => member.id === parsedBlockUserId)) {
                    lobby.members = lobby.members.filter(member => member.id !== parsedBlockUserId);
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
            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },


    getLobbies: (callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);
            const lobbiesArray = Object.values(lobbies).map((lobby) => {
                const { password, ...sanitizedLobby } = lobby; // password'u çıkarıyoruz, hasPassword kalıyor
                return {
                    ...sanitizedLobby,
                    members: lobby.members // Üye listesi zaten detaylarla zenginleştirilmiş durumda
                };
            });
            callback(null, lobbiesArray);
        });
    },

    getUserLobby: (userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const userLobby = Object.values(lobbies).find((lobby) =>
                lobby.members.some(member => member.id === userId)
            );

            callback(null, userLobby || null); // Return null if user is not in any lobby
        });
    },

    cleanupInactiveLobbies: () => { // Yeni temizlik fonksiyonu
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) {
                return console.error('Error cleaning up inactive lobbies:', err);
            }

            const now = Date.now();
            const timeoutDuration = 2 * 60 * 60 * 1000; // 2 hours

            let updated = false;
            Object.keys(lobbies).forEach(ownerId => {
                const lobby = lobbies[ownerId];
                if (lobby.lobbyType === 'Normal' && lobby.lastOwnerLeave) { // Normal lobi ve lastOwnerLeave varsa
                    if (now - lobby.lastOwnerLeave >= timeoutDuration) { // 2 hours geçmiş mi?
                        delete lobbies[ownerId];
                        updated = true;
                        console.log(`Normal lobby ${lobby.lobbyName} owned by ${ownerId} has been deleted due to inactivity timeout.`);
                    }
                }
            });

            if (updated) {
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {
                        console.error('Error saving lobbies after inactive cleanup:', err);
                    }
                });
            }
        });
    },

    cleanupEventLobbies: () => { // Mevcut event lobi temizliği (değişiklik yok)
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
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
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {
                        console.error('Error saving lobbies after cleanup:', err);
                    }
                });
            }
        });
    },
};

module.exports = lobbyManager;