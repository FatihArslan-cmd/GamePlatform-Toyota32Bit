// lobbyService.js
import api from '../../../../../shared/states/api';
import { getToken } from '../../../../../shared/states/api';

const createLobby = async (lobbyData) => {
  try {
    const token = await getToken(); // Get the token *inside* the service function
    const response = await api.post('/lobby/create', lobbyData, { // Pass options as 3rd argument to api.post
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Manually set Authorization header
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Failed to create lobby');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};

export { createLobby };