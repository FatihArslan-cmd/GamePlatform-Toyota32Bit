const lobbies = new Map(); // Kullanıcı ID'sine göre lobi bilgilerini tutacak.

const createLobby = (userId, lobbyName, maxCapacity = 8) => {
  if (lobbies.has(userId)) {
    throw new Error('User already owns a lobby');
  }

  const lobby = {
    lobbyName,
    ownerId: userId,
    members: [userId], // İlk üye lobi sahibidir.
    maxCapacity,
  };

  lobbies.set(userId, lobby);
  return lobby;
};

const joinLobby = (userId, lobbyName) => {
  const lobby = Array.from(lobbies.values()).find((l) => l.lobbyName === lobbyName);

  if (!lobby) {
    throw new Error('Lobby not found');
  }

  if (lobby.members.length >= lobby.maxCapacity) {
    throw new Error('Lobby is full');
  }

  if (lobby.members.includes(userId)) {
    throw new Error('User is already in this lobby');
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

  if (userLobby.members.length === 0) {
    lobbies.delete(userLobby.ownerId); // Lobi boşsa sil.
  }

  return userLobby;
};

const deleteLobby = (userId) => {
  if (!lobbies.has(userId)) {
    throw new Error('User does not own any lobby');
  }

  return lobbies.delete(userId);
};

const getLobbies = () => Array.from(lobbies.values());

module.exports = {
  createLobby,
  joinLobby,
  leaveLobby,
  deleteLobby,
  getLobbies,
};
