import api from '../../../../../shared/states/api';
import { getToken } from '../../../../../shared/states/api';

const createLobby = async (lobbyData) => {
  try {
    const token = await getToken(); 
    const response = await api.post('/lobby/create', lobbyData, { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create lobby');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message);
    }
  }
};

export { createLobby };