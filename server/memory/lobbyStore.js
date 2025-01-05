const lobbies = new Map();

const createLobby = (userId, lobbyName, lobbyType, maxCapacity = 8, gameName = null, password = null, startDate = null, endDate = null) => {
  if (lobbies.has(userId)) {
    throw new Error('User already owns a lobby');
  }

  const userLobby = Array.from(lobbies.values()).find((l) => l.members.includes(userId));
  if (userLobby) {
    throw new Error('User is already in a lobby. Leave the lobby to create a new one.');
  }

  if (!['normal', 'event'].includes(lobbyType)) {
    throw new Error('Invalid lobby type');
  }

  if (lobbyType === 'event' && (!startDate || !endDate)) {
    throw new Error('Event lobbies require startDate and endDate');
  }

  const lobby = {
    lobbyName,
    ownerId: userId,
    members: [userId],
    blockedMembers: [],
    maxCapacity,
    lobbyType,
    gameName,
    password,
    startDate: lobbyType === 'event' ? startDate : null,
    endDate: lobbyType === 'event' ? endDate : null,
    lastOwnerLeave: null,
    timeout: null,
  };

  lobbies.set(userId, lobby);
  return lobby;
};

const joinLobby = (userId, lobbyName, password = null) => {
  const userLobby = Array.from(lobbies.values()).find((l) => l.members.includes(userId));
  if (userLobby) {
    throw new Error('User is already in a lobby. Leave the lobby to join another.');
  }

  const lobby = Array.from(lobbies.values()).find((l) => l.lobbyName === lobbyName);

  if (!lobby) {
    throw new Error('Lobby not found');
  }

  if (lobby.password && lobby.password !== password) {
    throw new Error('Invalid password');
  }

  if (lobby.members.length >= lobby.maxCapacity) {
    throw new Error('Lobby is full');
  }

  if (lobby.members.includes(userId)) {
    throw new Error('User is already in this lobby');
  }

  if (lobby.ownerId === userId) {
    lobby.lastOwnerLeave = null;
    if (lobby.timeout) {
      clearTimeout(lobby.timeout);
      lobby.timeout = null;
    }
  }

  lobby.members.push(userId);
  return lobby;
};

const leaveLobby = (userId) => {
  const userLobby = Array.from(lobbies.values()).find((l) => l.members.includes(userId));

  if (!userLobby) {
    throw new Error('User is not in any lobby');
  }

  userLobby.members = userLobby.members.filter((id) => id !== userId);

  if (userLobby.ownerId === userId) {
    if (userLobby.lobbyType === 'event') {
      console.log(`Owner left, but lobby is event type and will remain active until ${userLobby.endDate}`);
    } else {
      userLobby.lastOwnerLeave = Date.now();
      userLobby.timeout = setTimeout(() => {
        lobbies.delete(userLobby.ownerId);
        console.log(`Lobby owned by ${userLobby.ownerId} has been deleted after 8 hours.`);
      }, 8 * 60 * 60 * 1000);
    }
  }

  if (userLobby.members.length === 0 && userLobby.lobbyType !== 'event') {
    lobbies.delete(userLobby.ownerId);
  }

  return userLobby;
};

const deleteLobby = (userId) => {
  if (!lobbies.has(userId)) {
    throw new Error('User does not own any lobby');
  }

  return lobbies.delete(userId);
};

const updateLobby = (userId, updates) => {
  const lobby = lobbies.get(userId);

  if (!lobby) {
    throw new Error('Lobby not found');
  }

  if (updates.lobbyType && !['normal', 'event'].includes(updates.lobbyType)) {
    throw new Error('Invalid lobby type');
  }

  if (updates.lobbyType === 'event' && (!updates.startDate || !updates.endDate)) {
    throw new Error('Event lobbies require startDate and endDate');
  }

  if (updates.addMember) {
    if (lobby.members.includes(updates.addMember)) {
      throw new Error('Member already in lobby');
    }
    if (lobby.blockedMembers.includes(updates.addMember)) {
      throw new Error('Member is blocked and cannot be added');
    }
    if (lobby.members.length >= lobby.maxCapacity) {
      throw new Error('Lobby is full');
    }
    lobby.members.push(updates.addMember);
  }

  if (updates.removeMember) {
    lobby.members = lobby.members.filter((id) => id !== updates.removeMember);
  }

  if (updates.blockMember) {
    if (lobby.members.includes(updates.blockMember)) {
      lobby.members = lobby.members.filter((id) => id !== updates.blockMember);
    }
    if (!lobby.blockedMembers.includes(updates.blockMember)) {
      lobby.blockedMembers.push(updates.blockMember);
    }
  }

  if (updates.unblockMember) {
    lobby.blockedMembers = lobby.blockedMembers.filter((id) => id !== updates.unblockMember);
  }

  Object.assign(lobby, updates);
  return lobby;
};

const getLobbies = () => Array.from(lobbies.values());

setInterval(() => {
  const now = Date.now();
  Array.from(lobbies.values()).forEach((lobby) => {
    if (lobby.lobbyType === 'event' && new Date(lobby.endDate).getTime() <= now) {
      lobbies.delete(lobby.ownerId);
      console.log(`Event lobby ${lobby.lobbyName} has been deleted due to end date.`);
    }
  });
}, 60 * 1000);

module.exports = {
  createLobby,
  joinLobby,
  leaveLobby,
  deleteLobby,
  updateLobby,
  getLobbies,
};
