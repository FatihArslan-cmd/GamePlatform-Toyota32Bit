const { sessionStore } = require('../../config/sessionConfig');
const lobbyManager = require('./lobbyManager');
const { getUserDetails } = require('../../utils/getUserDetails');
const { sendNotificationToUser } = require('../../controller/notificationController');


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

            const inviterDetails = getUserDetails(inviterUserId);
            if (!inviterDetails) {
                 console.error(`Inviter user details not found for ID: ${inviterUserId}`);
                 return callback(new Error('Inviter user details not found.'));
            }
            const inviterUsername = inviterDetails.username;
            const inviterProfilePhoto = inviterDetails.profilePhoto;


            sessionStore.get(invitedUserId, (err, invitedUserSession) => {
                if (err) return callback(err);

                const invitations = invitedUserSession?.lobbyInvitations || [];
                 if (invitations.some(invite => invite.lobbyCode === lobbyCode && invite.inviterUserId === inviterUserId && invite.status === 'pending')) {
                    return callback(new Error('Pending invitation already sent to this user for this lobby'));
                }

                const newInvitation = {
                    lobbyCode: lobbyCode,
                    inviterUserId: inviterUserId,
                    inviterUsername: inviterUsername,
                    timestamp: Date.now(),
                    status: 'pending',
                };
                invitations.push(newInvitation);

                sessionStore.set(invitedUserId, { ...invitedUserSession, lobbyInvitations: invitations }, (err) => {
                    if (err) {
                        console.error('Error saving invitation to session store:', err);
                        return callback(err);
                    }
                    const notificationTitle = "Lobby Invitation";
                    const notificationBody = `${inviterUsername} invited you to the lobby "${inviterLobby.lobbyName || lobbyCode}"! 🎉`;
                    const notificationData = {
                         type: 'lobby_invite',
                         lobbyCode: lobbyCode,
                         inviterUserId: inviterUserId.toString(),
                         inviterUsername: inviterUsername,
                         inviterProfilePhoto: inviterProfilePhoto || '',
                         lobbyName: inviterLobby.lobbyName || '',
                    };

                    sendNotificationToUser({
                        targetUserId: invitedUserId,
                        title: notificationTitle,
                        body: notificationBody,
                        data: notificationData,
                        sourceInfo: 'lobby_invite',
                    })
                    .then(response => {
                        console.log(`Notification sent successfully to user ID ${invitedUserId} for lobby ${lobbyCode}:`, response);
                         callback(null, newInvitation);
                    })
                    .catch(notificationError => {
                        console.error(`Failed to send notification to user ID ${invitedUserId} for lobby ${lobbyCode}:`, notificationError);
                         callback(null, newInvitation);
                    });
                });
            });
        });
    },

    getLobbyInvitesForUser: (userId, callback) => {
        sessionStore.get(userId, (err, userSession) => {
            if (err) return callback(err);
            const invitations = userSession?.lobbyInvitations || [];
            const pendingInvitations = invitations.filter(invite => invite.status === 'pending');

            lobbyManager.getLobbiesFromSession((err, lobbies) => {
                if (err) return callback(err);

                const enrichedInvitations = pendingInvitations.map(invite => {
                    const lobby = Object.values(lobbies).find(l => l.code === invite.lobbyCode);
                    const inviterDetails = getUserDetails(invite.inviterUserId);

                    const enrichedInvite = { ...invite, lobbyName: lobby?.lobbyName };

                    if (inviterDetails) {
                        enrichedInvite.inviterProfilePhoto = inviterDetails.profilePhoto;
                    } else {
                        enrichedInvite.inviterProfilePhoto = null;
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

                invitations[invitationIndex].status = 'accepted';

                lobbyManager.joinLobby(userId, lobbyCode, { isInvite: true }, (joinErr, joinedLobby) => {
                    if (joinErr) {
                        return callback(joinErr);
                    }

                    sessionStore.get(userId, (getSessionErr, userSession) => {
                        if (getSessionErr) {
                            console.error('Session error getting user session for invite acceptance:', getSessionErr);
                            return callback(null, joinedLobby);
                        }

                        let invitations = userSession?.lobbyInvitations || [];
                        const invitationIndex = invitations.findIndex(invite => invite.lobbyCode === lobbyCode && invite.status === 'pending');

                        if (invitationIndex !== -1) {
                            invitations[invitationIndex].status = 'accepted';
                            userSession.lobbyInvitations = invitations.filter(
                                invite => !(invite.lobbyCode === lobbyCode && invite.status === 'pending')
                            );

                            sessionStore.set(userId, userSession, (setErr) => {
                                if (setErr) {
                                    console.error('Session error updating invitations after acceptance:', setErr);
                                } else {
                                    console.log(`Invitation for lobby ${lobbyCode} marked as accepted and removed from pending for user ${userId}.`);
                                }
                                callback(null, joinedLobby);
                            });
                        } else {
                            console.warn(`No pending invitation found to mark as accepted for user ${userId}, lobby ${lobbyCode}. User still joined.`);
                            callback(null, joinedLobby);
                        }
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