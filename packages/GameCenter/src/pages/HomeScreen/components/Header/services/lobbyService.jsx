import api from '../../../../../shared/states/api';
import { getToken } from '../../../../../shared/states/api';


const lobbyService = {
  listLobbies: async () => {
    try {
      const token = await getToken();
      const response = await api.get(`/lobby/list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching lobbies:', error);
      throw error; // Re-throw for the component to handle
    }
  },

  joinLobby: async (code) => {
    try {
      const token = await getToken();
      const response = await api.post(
        `/lobby/join`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error joining lobby:', error);
      throw error; // Re-throw for the component to handle
    }
  },
};

export default lobbyService;