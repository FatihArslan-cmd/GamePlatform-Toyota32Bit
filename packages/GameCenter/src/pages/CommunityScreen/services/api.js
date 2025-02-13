import { getToken } from '../../../shared/states/api';
import api from '../../../shared/states/api';

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // conditionally add authorization header
  };
};


export const createRoom = async (name, topic, imageUrl) => {
    try {
        const response = await api.post('/rooms', {
            name: name, // or just name,
            topic: topic, // or just topic,
            imageUrl: imageUrl, // or just imageUrl
        }, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
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

export const getOthersRoom = async () => {
  try {
    const response = await api.get(`/rooms/other`, {}, { headers: getHeaders() }); // added empty body because POST requests should have a body even if empty to avoid potential issues with server
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const meJoinedRooms = async () => {
    try {
      const response = await api.get(`/rooms/me-joined-rooms`, {}, { headers: getHeaders() }); // added empty body because POST requests should have a body even if empty to avoid potential issues with server
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
export const getmyRooms = async () => {
    try {
      const response = await api.get(`/rooms/me`, {}, { headers: getHeaders() }); // added empty body because POST requests should have a body even if empty to avoid potential issues with server
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