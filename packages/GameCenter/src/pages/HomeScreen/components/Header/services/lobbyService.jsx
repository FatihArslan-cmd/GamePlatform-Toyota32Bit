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


  joinLobby: async (code, password = null) => {
    try {
        const token = await getToken();
        const response = await api.post(
            `/lobby/join`,
            { code, password }, 
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

  leaveLobby: async (lobbyId) => {
    try {
      const token = await getToken();
      const response = await api.post( // Assuming a POST request for leaving lobby
        `/lobby/leave`, // Endpoint for leaving lobby
        { lobbyId }, // Sending lobbyId in the request body
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

  deleteLobby: async () => {
    try {
      const token = await getToken();
      const response = await api.delete( // Using DELETE request for deleting lobby
        `/lobby/delete`, // Endpoint for deleting lobby, using lobbyId in path param (can be adjusted if needed)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting lobby:', error);
      throw error;
    }
  },

  kickPlayer: async (lobbyId, playerId) => {
    try {
      const token = await getToken();
      const response = await api.put( // Using PUT request to update lobby
        `/lobby/update`,
        { removeMember: playerId }, // Send removeMember to kick
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error kicking player:', error);
      throw error;
    }
  },

  kickAndBlockPlayer: async (lobbyId, playerId) => {
    try {
      const token = await getToken();
      const response = await api.put( // Using PUT request to update lobby
        `/lobby/update`,
        { blockMember: playerId }, // Send blockMember to kick and block
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error kicking and blocking player:', error);
      throw error;
    }
  },
};

export default lobbyService;