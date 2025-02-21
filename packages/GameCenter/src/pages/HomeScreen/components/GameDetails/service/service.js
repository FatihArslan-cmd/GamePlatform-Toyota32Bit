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
};

export default lobbyService;