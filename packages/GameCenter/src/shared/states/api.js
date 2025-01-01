import axios from 'axios';
import { storage } from '../../utils/storage';

// Axios instance oluşturma
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api', // Backend'inizin URL'sini yazın
  timeout: 5000, // İsteğin zaman aşım süresi
});

// Token'i eklemek için interceptor
api.interceptors.request.use(
  async (config) => {
    const token = getToken(); // MMKV'den token'i al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Access token missing in response');
    }

    saveToken(accessToken); // Save the access token
    return response.data;
  } catch (error) {
    console.log('Login error:', error);
    throw error.response?.data || { message: 'An error occurred' };
  }
};

const saveToken = (token) => {
  if (!token || typeof token !== 'string') {
    console.error('Invalid token:', token);
    throw new Error('Token must be a non-empty string');
  }
  storage.set('token', token); // Save token in MMKV
};


export const getProtectedData = async () => {
  try {
    const response = await api.get('/protected');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};




// Token alma fonksiyonu (MMKV)
export const getToken = () => {
  return storage.getString('token'); // MMKV'den token'i alıyoruz
};

// Token silme fonksiyonu (Logout için kullanılabilir)
export const removeToken = () => {
  storage.delete('token'); // MMKV'den token'i siliyoruz
  console.log(storage.getString('token')); // Should be null or undefined after logout
};


export const refreshAccessToken = async () => {
  try {
    const response = await api.post('/refresh-token');
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Access token missing in response');
    }

    saveToken(accessToken); // Yeni token'ı kaydedin
    return accessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error.response?.data || { message: 'An error occurred' };
  }
};



export default api;
