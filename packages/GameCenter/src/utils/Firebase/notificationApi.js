import api from "../../shared/states/api";
import { getFCMToken } from "./notificationHandlers";

export const saveFcmTokenToServer = async () => {
  try {
    const fcmToken = await getFCMToken();
    const response = await api.post('/notifications/save-token', { fcmToken: fcmToken });
    console.log('FCM token successfully saved on server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending FCM token to server:', error);
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error: No response received', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    throw error;
  }
};

export const removeFcmTokenFromServer = async () => {
  try {
    const fcmToken = await getFCMToken();
    const response = await api.post('/notifications/remove-token', { fcmToken: fcmToken });
    console.log('FCM token successfully removed from server session:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing FCM token from server:', error);
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error: No response received', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    throw error;
  }
};