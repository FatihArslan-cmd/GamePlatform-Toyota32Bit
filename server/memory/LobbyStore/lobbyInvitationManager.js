const { sessionStore } = require('../../config/sessionConfig');
const lobbyManager = require('./lobbyManager'); 
const { getUserDetails } = require('../../utils/getUserDetails');

const lobbyInvitationManager = {
    sendLobbyInvite: (inviterUserId, invitedUserId, lobbyCode, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const inviterLobby = Object.values(lobbies).find(l => l.members.some(member => member.id === inviterUserId));
            if (!inviterLobby) {
                return callback(new Error('Inviter is not in a lobby or does not own a lobby'));
            }
            if (inviterLobby.code !== lobbyCode) {
                return callback(new Error('Lobby code does not match inviter\'s current lobby'));
            }


            sessionStore.get(invitedUserId, (err, invitedUserSession) => {
                if (err) return callback(err);

                const invitations = invitedUserSession?.lobbyInvitations || [];
                if (invitations.some(invite => invite.lobbyCode === lobbyCode && invite.inviterUserId === inviterUserId)) {
                    return callback(new Error('Invitation already sent to this user for this lobby'));
                }

                const newInvitation = {
                    lobbyCode: lobbyCode,
                    inviterUserId: inviterUserId,
                    inviterUsername: getUserDetails(inviterUserId).username, 
                    timestamp: Date.now(),
                    status: 'pending',
                };
                invitations.push(newInvitation);

                sessionStore.set(invitedUserId, { ...invitedUserSession, lobbyInvitations: invitations }, (err) => {
                    if (err) return callback(err);
                    callback(null, newInvitation);
                });
            });
        });
    },

    getLobbyInvitesForUser: (userId, callback) => {
        sessionStore.get(userId, (err, userSession) => {
            if (err) return callback(err);
            const invitations = userSession?.lobbyInvitations || [];
            const pendingInvitations = invitations.filter(invite => invite.status === 'pending');

            lobbyManager.getLobbiesFromSession((err, lobbies) => { // Lobbies'i buradan alıyoruz
                if (err) return callback(err);

                const enrichedInvitations = pendingInvitations.map(invite => {
                    const lobby = Object.values(lobbies).find(l => l.code === invite.lobbyCode);
                    const inviterDetails = getUserDetails(invite.inviterUserId); // Get inviter details

                    const enrichedInvite = { ...invite, lobbyName: lobby?.lobbyName }; // lobbyName'i ekliyoruz

                    if (inviterDetails) {
                        enrichedInvite.inviterProfilePhoto = inviterDetails.profilePhoto; // Add inviter's profile photo
                    } else {
                        enrichedInvite.inviterProfilePhoto = null; // or some default if user not found
                    }
                    return enrichedInvite;
                });
                callback(null, enrichedInvitations);
            });
        });
    },

    acceptLobbyInvite: (userId, lobbyCode, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby not found'));
            }

            sessionStore.get(userId, (err, userSession) => {
                if (err) return callback(err);
                let invitations = userSession?.lobbyInvitations || [];
                const invitationIndex = invitations.findIndex(invite => invite.lobbyCode === lobbyCode && invite.status === 'pending');

                if (invitationIndex === -1) {
                    return callback(new Error('No pending invitation found for this lobby'));
                }

                const invitation = invitations[invitationIndex];
                invitations[invitationIndex].status = 'accepted'; // Davet durumunu 'accepted' olarak güncelle

                lobbyManager.joinLobby(userId, lobbyCode, { isInvite: true }, (joinErr, joinedLobby) => { // isInvite true olarak ayarlandı
                    if (joinErr) {
                        return callback(joinErr); // joinLobby hatasını callback'e ilet
                    }

                    // Invitation temizleme işlemi buraya taşındı
                    userSession.lobbyInvitations = invitations.filter(
                        invite => !(invite.lobbyCode === lobbyCode && invite.status === 'pending')
                    );
                    sessionStore.set(userId, userSession, (setErr) => {
                        if (setErr) {
                            console.error('Session error updating invitations:', setErr);
                            // Session güncelleme hatası durumunda ne yapılacağına karar verin.
                        } else {
                            console.log(`Pending invitations for lobby ${lobbyCode} removed for user ${userId} after joining.`);
                        }
                        callback(null, joinedLobby); // Başarılı katılım ve davet güncellemesi sonrası lobiyi döndür
                    });
                });
            });
        });
    },


    rejectLobbyInvite: (userId, lobbyCode, callback) => {
        sessionStore.get(userId, (err, userSession) => {
            if (err) return callback(err);
            let invitations = userSession?.lobbyInvitations || [];
            const invitationIndex = invitations.findIndex(invite => invite.lobbyCode === lobbyCode && invite.status === 'pending');
            if (invitationIndex === -1) {
                return callback(new Error('No pending invitation found for this lobby'));
            }

            invitations[invitationIndex].status = 'rejected';

            sessionStore.set(userId, { ...userSession, lobbyInvitations: invitations }, (err) => {
                if (err) return callback(err);
                callback(null, { message: 'Invitation rejected' });
            });
        });
    },

    getInvitationCountForUser: (userId, callback) => {
        sessionStore.get(userId, (err, userSession) => {
            if (err) return callback(err);
            const invitations = userSession?.lobbyInvitations || [];
            const pendingInvitationsCount = invitations.filter(invite => invite.status === 'pending').length;
            callback(null, pendingInvitationsCount);
        });
    },
};

module.exports = lobbyInvitationManager;