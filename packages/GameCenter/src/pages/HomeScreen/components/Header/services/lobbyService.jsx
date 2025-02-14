import api from '../../../../../shared/states/api';
import { getToken } from '../../../../../shared/states/api';


const lobbyService = {
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


  joinLobby: async (code, password = null) => { // Password is optional now
    try {
        const token = await getToken();
        const response = await api.post(
            `/lobby/join`,
            { code, password }, // Include password, might be null initially
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        // No console.error here, let component handle it for password prompt
        throw error; // Re-throw for the component to handle
    }
},
};

export default lobbyService;