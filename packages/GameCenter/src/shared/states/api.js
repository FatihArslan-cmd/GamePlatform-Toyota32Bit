import axios from 'axios';
import { storage } from '../../utils/storage';


let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Eğer token süresi dolmuşsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken(getRefreshToken());
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const login = async (username, password,) => {
  try {
    const response = await api.post('/login', { username, password });
    const { accessToken, refreshToken, profilePhoto, encryptedInfo} = response.data;

    if (!accessToken) {
      throw new Error('Access token missing in response');
    }

    saveToken(accessToken);
    saveRefreshToken(refreshToken);
    

    const userData = {
      username,
      profilePhoto,
      encryptedInfo
    }
    await storage.set('user', JSON.stringify(userData)) 
    return {data: userData, resData: response.data};
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
  storage.set('token', token); 
};
export const getRefreshToken = () => storage.getString('refreshToken');

export const removeRefreshToken = () => {
  storage.delete('refreshToken');
};

export const saveRefreshToken = (refreshAccessToken) => {
  if (!refreshAccessToken || typeof refreshAccessToken !== 'string') {
    console.error('Invalid token:', refreshAccessToken);
    throw new Error('Token must be a non-empty string');
  }
  storage.set('refreshToken', refreshAccessToken); // Save token in MMKV
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


export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('/refresh-token', {refreshToken});

     console.log('response', response);
    const { accessToken } = response.data; // Yeni access token'ı al
    saveToken(accessToken); // Yeni access token
    return accessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error.response?.data || { message: 'An error occurred' }; // Hata mesajını döndür
  }
};




export default api;
