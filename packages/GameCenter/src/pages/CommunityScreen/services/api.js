import { getToken } from '../../../shared/states/api';
import api from '../../../shared/states/api';

// Helper function to add the token to the headers
const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // conditionally add authorization header
  };
};


export const createRoom = async (name) => {
    try {
      const response = await api.post('/rooms', { name: name }, { // Use POST to create a room, and include the name in the body
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error); // Log the error for debugging
      throw error.response ? error.response.data : error.message;
    }
  };

export const getRooms = async () => {
  try {
    const response = await api.get('/rooms', { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRoom = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const joinRoom = async (roomId) => {
  try {
    const response = await api.post(`/rooms/${roomId}/join`, {}, { headers: getHeaders() }); // added empty body because POST requests should have a body even if empty to avoid potential issues with server
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const leaveRoom = async (roomId) => {
    try {
        const response = await api.post(`/rooms/${roomId}/leave`, {}, { headers: getHeaders() }); // added empty body because POST requests should have a body even if empty to avoid potential issues with server
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/rooms/${roomId}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const becomeSupporter = async (roomId) => {
    try {
        const response = await api.post(`/rooms/${roomId}/become-supporter`, {}, { headers: getHeaders() });  // added empty body because POST requests should have a body even if empty to avoid potential issues with server
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
  };
  
  export const leaveSupporter = async (roomId) => {
    try {
        const response = await api.post(`/rooms/${roomId}/leave-supporter`, {}, { headers: getHeaders() });  // added empty body because POST requests should have a body even if empty to avoid potential issues with server
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
  };