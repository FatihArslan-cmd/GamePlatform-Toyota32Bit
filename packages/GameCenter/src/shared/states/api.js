import axios from "axios";
import navigationService from "./navigationService";
import { ToastService } from "../../context/ToastService";
import { saveFcmTokenToServer } from "../../utils/Firebase/notificationApi";
import { baseURL } from "../../utils/baseUrl";
import { storage } from "../../utils/storage";

let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
 baseURL: `http://${baseURL}/api`,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.response.data?.error === 'TokenExpiredError') {
        navigationService.navigate('Login');
        removeToken();
        return Promise.reject({ ...error, tokenExpired: true });

      } else {
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
          const refreshToken = await getRefreshToken();
          if (!refreshToken) {
            navigationService.navigate('Login');
            removeToken();
            isRefreshing = false;
            return Promise.reject(error);
          }

          const newAccessToken = await refreshAccessToken(refreshToken);

          await saveToken(newAccessToken);

          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          processQueue(refreshError, null);
          removeToken();
          removeRefreshToken();
          navigationService.navigate('Login');
          ToastService.show('warning','Session expired. Please log in again.');

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
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

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { accessToken, refreshToken, profilePhoto, encryptedInfo} = response.data;

    saveToken(accessToken);
    saveRefreshToken(refreshToken);
    await saveFcmTokenToServer();
    const userData = {
      username,
      profilePhoto,
      encryptedInfo
    }
    await storage.set('user', JSON.stringify(userData))
    return {data: userData, resData: response.data};
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('/refresh-token', {refreshToken});

     console.log('response', response);
     saveToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error.response?.data || { message: 'An error occurred' };
  }
};



export const saveToken = (token) => {
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
  storage.set('refreshToken', refreshAccessToken);
};


export const getProtectedData = async () => {
  try {
    const response = await api.get('/protected');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};


export const getToken = () => {
  return storage.getString('token');
};

export const removeToken = () => {
  storage.delete('token');
  console.log(storage.getString('token'));
};

export default api;