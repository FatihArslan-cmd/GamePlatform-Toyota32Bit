const { sessionStore } = require('../../config/sessionConfig');
const { getUserDetails } = require('../../utils/getUserDetails');
const { sendNotificationToUser } = require('../../controller/notificationController');


const lobbyManager = {
    getLobbiesFromSession: (callback) => {
        sessionStore.get('lobbies', (err, lobbiesData) => {
            if (err) {
                return callback(err);
            }
            const lobbies = lobbiesData || {};
            callback(null, lobbies);
        });
    },

    saveLobbiesToSession: (lobbies, callback) => {
        sessionStore.set('lobbies', lobbies, (err) => {
            if (err) {
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
                today.setHours(0, 0, 0, 0);

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
                timeout: null,
                hasPassword: hasPassword,
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

            if (!isInvite && lobby.hasPassword && lobby.password !== password) {
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

            const joiningUserDetails = getUserDetails(userId);
             if (!joiningUserDetails) {
                 return callback(new Error('Could not get joining user details'));
             }

            lobby.members.push(joiningUserDetails);
            lobbies[lobby.ownerId] = lobby;

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);

                const notificationTitle = "Lobby Update";
                const notificationBody = `${joiningUserDetails.username} has joined the lobby. 👋`;

                const notificationData = {
                     type: 'user_joined_lobby',
                     lobbyCode: lobby.code,
                     joinedUserId: userId.toString(),
                     joinedUsername: joiningUserDetails.username,
                     joinedUserProfilePhoto: joiningUserDetails.profilePhoto || '',
                     lobbyName: lobby.lobbyName || '',
                };


                lobby.members.forEach(member => {
                    if (member.id !== userId) {
                         sendNotificationToUser({
                             targetUserId: member.id,
                             title: notificationTitle,
                             body: notificationBody,
                             data: notificationData,
                             sourceInfo: 'user_joined_lobby',
                         })
                         .then(response => {})
                         .catch(notificationError => {});
                    }
                });

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

            userLobby.members = userLobby.members.filter(member => member.id !== userId);

            let lobbyDeleted = false;
            let isOwnerLeaving = userLobby.ownerId === userId;

            if (isOwnerLeaving) {
                if (userLobby.lobbyType === 'Event') {
                } else {
                    userLobby.lastOwnerLeave = Date.now();
                }
                if (userLobby.members.length === 0) {
                    delete lobbies[userId];
                    lobbyDeleted = true;
                }
            }
            if (userLobby.members.length === 0 && !isOwnerLeaving) {
                const ownerId = Object.keys(lobbies).find(key => lobbies[key].code === userLobby.code);
                if (ownerId) {
                    delete lobbies[ownerId];
                    lobbyDeleted = true;
                }
            } else if (!lobbyDeleted) {
                lobbies[userLobby.ownerId] = userLobby;
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

            const lobbyToDelete = lobbies[userId];

            if (!lobbyToDelete) {
                return callback(new Error('User does not own any lobby'));
            }

            if (lobbyToDelete.ownerId !== userId) {
                return callback(new Error('Only the lobby owner can delete the lobby'));
            }

             const deletedLobbyCode = lobbyToDelete.code;
             const deletedLbyName = lobbyToDelete.lobbyName || deletedLobbyCode;
             const ownerUsername = getUserDetails(userId)?.username || 'Owner';

             const membersBeforeDelete = [...lobbyToDelete.members];


            delete lobbies[userId];

            sessionStore.all((err, sessions) => {
                if (err) {
                }

                let updatedSessions = 0;
                for (const sessionId in sessions) {
                    const session = sessions[sessionId];
                    if (session && session.lobbyInvitations) {
                        let invitations = session.lobbyInvitations;
                        const initialInvitationCount = invitations.length;
                        invitations = invitations.filter(invite => invite.lobbyCode !== deletedLobbyCode);
                        if (invitations.length !== initialInvitationCount) {
                            session.lobbyInvitations = invitations;
                            sessionStore.set(sessionId, session, (err) => {
                                if (err) {} else { updatedSessions++; }
                            });
                        }
                    }
                }


                const notificationTitle = "Lobby Deleted";
                const notificationBody = `The lobby "${deletedLbyName}" has been deleted by the owner ${ownerUsername}.`;

                const notificationData = {
                    type: 'lobby_deleted_by_owner',
                    lobbyCode: deletedLobbyCode,
                    deletedByUserId: userId.toString(),
                    deletedByUsername: ownerUsername,
                    lobbyName: deletedLbyName,
                };

                membersBeforeDelete.forEach(member => {
                    if (member.id !== userId) {
                        sendNotificationToUser({
                            targetUserId: member.id,
                            title: notificationTitle,
                            body: notificationBody,
                            data: notificationData,
                            sourceInfo: 'lobby_deleted_by_owner',
                        })
                        .then(response => {})
                        .catch(notificationError => {});
                    }
                });


                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) return callback(err);
                    callback(null, true);
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

            if (updates.lobbyType === 'Event' || lobby.lobbyType === 'Event') {
                const startDate = updates.startDate || lobby.startDate;
                const endDate = updates.endDate || lobby.endDate;

                if (!startDate || !endDate) {
                    return callback(new Error('Event lobbies require startDate and endDate'));
                }

                const start = new Date(startDate);
                const end = new Date(endDate);

                if (start > end) {
                    return callback(new Error('Start date cannot be after end date'));
                }
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
                const addedMemberDetails = getUserDetails(parsedUserId);
                 if (!addedMemberDetails) {
                     return callback(new Error('Could not get details for user to add'));
                 }
                 lobby.members.push(addedMemberDetails);
                 delete updates.addMember;
            }

            if (updates.removeMember) {
                const parsedUserId = parseInt(updates.removeMember);
                if (parsedUserId === lobby.ownerId) {
                    return callback(new Error('Lobby owner cannot kick themselves'));
                }
                const memberToRemoveIndex = lobby.members.findIndex(member => member.id === parsedUserId);
                if (memberToRemoveIndex > -1) {
                    lobby.members = lobby.members.filter(member => member.id !== parsedUserId);
                } else {
                    return callback(new Error('Member not found in lobby'));
                }
                 delete updates.removeMember;
            }

            if (updates.blockMember) {
                const parsedBlockUserId = parseInt(updates.blockMember);
                if (parsedBlockUserId === lobby.ownerId) {
                    return callback(new Error('Lobby owner cannot block themselves'));
                }
                const memberToBlockIndex = lobby.members.findIndex(member => member.id === parsedBlockUserId);
                 if (memberToBlockIndex > -1) {
                     lobby.members = lobby.members.filter(member => member.id !== parsedBlockUserId);
                 }
                if (!lobby.blockedMembers.includes(parsedBlockUserId)) {
                    lobby.blockedMembers.push(parsedBlockUserId);
                }
                 delete updates.blockMember;
            }

            if (updates.unblockMember) {
                 const parsedUnblockUserId = parseInt(updates.unblockMember);
                lobby.blockedMembers = lobby.blockedMembers.filter(memberId => memberId !== parsedUnblockUserId);
                 delete updates.unblockMember;
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
                const { password, ...sanitizedLobby } = lobby;
                return {
                    ...sanitizedLobby,
                    members: lobby.members,
                    bingoCards: lobby.bingoCards
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

            callback(null, userLobby || null);
        });
    },

    cleanupInactiveLobbies: () => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) {
                return;
            }

            const now = Date.now();
            const timeoutDuration = 2 * 10 * 1000;

            let updated = false;
            const lobbiesToDelete = [];
            Object.keys(lobbies).forEach(ownerId => {
                const lobby = lobbies[ownerId];
                 if (lobby.lobbyType === 'Normal' && lobby.lastOwnerLeave) {
                    if (now - lobby.lastOwnerLeave >= timeoutDuration) {
                         lobbiesToDelete.push({ ownerId: ownerId, lobby: lobby });
                         updated = true;
                    }
                }
            });

             lobbiesToDelete.forEach(({ ownerId, lobby }) => {

                  const notificationTitle = "Lobby Deleted (Inactive)";
                  const notificationBody = `The lobby "${lobby.lobbyName || lobby.code}" has been deleted due to inactivity.`;
                  const notificationData = {
                      type: 'lobby_deleted_inactive',
                      lobbyCode: lobby.code,
                      lobbyName: lobby.lobbyName || '',
                  };

                  lobby.members.forEach(member => {
                       sendNotificationToUser({
                           targetUserId: member.id,
                           title: notificationTitle,
                           body: notificationBody,
                           data: notificationData,
                           sourceInfo: 'lobby_deleted_inactive',
                       })
                       .then(response => {})
                       .catch(notificationError => {});
                  });

                  delete lobbies[ownerId];
             });


            if (updated) {
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {}
                });
            }
        });
    },

    cleanupEventLobbies: () => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) {
                return;
            }

            let updated = false;
             const eventLobbiesToDelete = [];
            const now = Date.now();
            Object.keys(lobbies).forEach(ownerId => {
                const lobby = lobbies[ownerId];
                if (lobby.lobbyType === 'Event' && new Date(lobby.endDate).getTime() <= now) {
                     eventLobbiesToDelete.push({ ownerId: ownerId, lobby: lobby });
                    updated = true;
                }
            });

             eventLobbiesToDelete.forEach(({ ownerId, lobby }) => {

                 const notificationTitle = "Event Lobby Ended";
                 const notificationBody = `The event lobby "${lobby.lobbyName || lobby.code}" has ended and is now closed.`;
                 const notificationData = {
                     type: 'lobby_deleted_event_ended',
                     lobbyCode: lobby.code,
                     lobbyName: lobby.lobbyName || '',
                 };

                 lobby.members.forEach(member => {
                      sendNotificationToUser({
                          targetUserId: member.id,
                          title: notificationTitle,
                          body: notificationBody,
                          data: notificationData,
                          sourceInfo: 'lobby_deleted_event_ended',
                      })
                      .then(response => {})
                      .catch(notificationError => {});
                 });

                delete lobbies[ownerId];
             });


            if (updated) {
                lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                    if (err) {}
                });
            }
        });
    },
};

module.exports = lobbyManager;
