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

// Giriş yapma fonksiyonu
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { token } = response.data;
    saveToken(token); // Token'i MMKV'ye kaydet
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

// Korunan veri alma fonksiyonu
export const getProtectedData = async () => {
  try {
    const response = await api.get('/protected');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

// Token kaydetme fonksiyonu (MMKV)
const saveToken = (token) => {
  storage.set('token', token); // Token'i MMKV'ye kaydediyoruz
};

// Token alma fonksiyonu (MMKV)
const getToken = () => {
  return storage.getString('token'); // MMKV'den token'i alıyoruz
};

// Token silme fonksiyonu (Logout için kullanılabilir)
export const removeToken = () => {
  storage.delete('token'); // MMKV'den token'i siliyoruz
};

export default api;
