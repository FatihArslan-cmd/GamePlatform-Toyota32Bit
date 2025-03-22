import api from "../../../shared/states/api";
import { getToken } from "../../../shared/states/api";

const lobbyService = {
  getLobbies: async () => {
    try {
      const token = await getToken();
      const response = await api.get(`/lobby/list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.lobbies; 
    } catch (error) {
      console.error('Error fetching lobbies:', error);
      throw error;
    }
  },
  getUserLobby: async () => {
    try {
        const token = await getToken();
        const response = await api.get(`/lobby/listUserLobby`, { 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.lobby; 
      } catch (error) {
        console.error('Error fetching user lobby:', error);
        throw error;
      }
  },
  leaveLobby: async (lobbyId) => {
    try {
      const token = await getToken();
      const response = await api.post( 
        `/lobby/leave`, 
        { lobbyId }, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error leaving lobby:', error);
      throw error;
    }
  },
  startGame: async () => {
    try {
      const token = await getToken();
      const response = await api.post(`/lobby/start-game`, {}, { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Failed to start the game. Please try again.");
      }
    }
  },
  getGameHistory: async () => { 
    try {
      const token = await getToken();
      const response = await api.get(`/lobby/game/history`, { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching game history:', error);
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Failed to fetch game history. Please try again.");
      }
    }
  },
};

export default lobbyService;