import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/api/rooms'; // Backend adresinizi buraya yazın

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Cookie'leri göndermek için (session)
});

export const createRoom = async (name) => {
  try {
    const response = await api.post('/', { name });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRooms = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRoom = async (roomId) => {
  try {
    const response = await api.get(`/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const joinRoom = async (roomId) => {
  try {
    const response = await api.post(`/${roomId}/join`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const leaveRoom = async (roomId) => {
    try {
        const response = await api.post(`/${roomId}/leave`);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const becomeSupporter = async (roomId) => {
    try {
        const response = await api.post(`/${roomId}/become-supporter`);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
  };
  
  export const leaveSupporter = async (roomId) => {
    try {
        const response = await api.post(`/${roomId}/leave-supporter`);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
  };