import api from "../../shared/states/api";
import { getFCMToken } from "./notificationHandlers";

export const saveFcmTokenToServer = async (username) => {
  try {
    if (!username) {
        console.warn("saveFcmTokenToServer: No username provided.");
        return null;
    }

    const fcmToken = await getFCMToken();

    if (!fcmToken) {
        console.warn("saveFcmTokenToServer: Could not get FCM token.");
        return null;
    }

    const response = await api.post('/notifications/save-token', {
      fcmToken: fcmToken,
      username: username
    });
    console.log('FCM token successfully saved on server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending FCM token and username to server:', error);
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      throw new Error(`Server responded with status ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('Request error: No response received', error.request);
       throw new Error('Network error: Could not reach the server.');
    } else {
      console.error('Request setup error:', error.message);
       throw new Error(`Request setup failed: ${error.message}`);
    }
  }
};

export const removeFcmTokenFromServer = async () => {
  try {
    const fcmToken = await getFCMToken();

     if (!fcmToken) {
        console.warn("removeFcmTokenFromServer: Could not get FCM token.");
        return null;
    }

    const response = await api.post('/notifications/remove-token', { fcmToken: fcmToken });
    console.log('FCM token successfully removed from server session:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing FCM token from server:', error);
     if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      throw new Error(`Server responded with status ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('Request error: No response received', error.request);
      throw new Error('Network error: Could not reach the server.');
    } else {
      console.error('Request setup error:', error.message);
       throw new Error(`Request setup failed: ${error.message}`);
    }
  }
};