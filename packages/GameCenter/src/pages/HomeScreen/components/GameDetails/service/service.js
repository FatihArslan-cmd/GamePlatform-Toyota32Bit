import api from "../../../../../shared/states/api";
import { getToken } from "../../../../../shared/states/api";

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
      return response.data.lobbies; // Return the lobbies array
    } catch (error) {
      console.error('Error fetching lobbies:', error);
      throw error;
    }
  },
  getUserLobby: async () => {
    try {
        const token = await getToken();
        const response = await api.get(`/lobby/listUserLobby`, { // Call the new endpoint
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.lobby; // Return the lobby data from the response
      } catch (error) {
        console.error('Error fetching user lobby:', error);
        throw error;
      }
  },
  startGame: async () => { // Add startGame function
    try {
      const token = await getToken();
      const response = await api.post(`/lobby/start-game`, {}, { // POST request to start game
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the response data (optional, can be adjusted based on backend response)
    } catch (error) {
      console.error('Error starting game:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // Re-throw with the backend error message
        throw new Error(error.response.data.message);
      } else {
        // Re-throw with a generic message if backend message is not available
        throw new Error("Failed to start the game. Please try again.");
      }
    }
  },
};

export default lobbyService;