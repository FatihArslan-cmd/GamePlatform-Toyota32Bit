import { getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

const app = getApp();
const messaging = getMessaging(app); 

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return;
    }
  }

  const authStatus = await messaging.requestPermission(); 
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await getFCMToken();
  }
};

export const getFCMToken = async () => {
  const token = await messaging.getToken(); 
  console.log('FCM Token:', token);
  return token;
};

export const setupForegroundNotifications = () => {
  return messaging.onMessage(async remoteMessage => { 
    if (remoteMessage) {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Notification',
        body: remoteMessage.notification?.body || 'Notification body',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
          sound: 'lumos_sound_effect',
        },
      });
    }
  });
};

export const setupBackgroundNotifications = () => {
  messaging.setBackgroundMessageHandler(async remoteMessage => { 
    console.log(remoteMessage);
  });
};

export const checkInitialNotification = async () => {
  const remoteMessage = await messaging.getInitialNotification();
  if (remoteMessage) {
    console.log(remoteMessage);
  }
};

export const createDefaultChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};