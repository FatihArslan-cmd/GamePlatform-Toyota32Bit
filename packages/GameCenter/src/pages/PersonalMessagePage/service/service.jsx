// service/service.js
import api from '../../../shared/states/api';
import { getToken } from '../../../shared/states/api';


const lobbyService = {

  getLobbyInvites: async () => {
    try {
      const token = await getToken();
      const response = await api.get(`/lobby/invitations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching lobby invites:', error);
      throw error;
    }
  },

  acceptLobbyInvite: async (lobbyCode) => {
    try {
      const token = await getToken();
      const response = await api.post(
        `/lobby/invitations/accept`,
        { lobbyCode },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error accepting lobby invite:', error);
      throw error;
    }
  },

  rejectLobbyInvite: async (lobbyCode) => {
    try {
      const token = await getToken();
      const response = await api.post(
        `/lobby/invitations/reject`,
        { lobbyCode },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error rejecting lobby invite:', error);
      throw error;
    }
  },
};

export default lobbyService;