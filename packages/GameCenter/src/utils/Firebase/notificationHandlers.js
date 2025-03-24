import { getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

const app = getApp();
const messaging = getMessaging(app); // Initialize getMessaging once and store it in 'messaging'

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bildirim izni reddedildi');
      return;
    }
  }

  const authStatus = await messaging.requestPermission(); // Use the 'messaging' instance
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || // Use the 'messaging' instance
    authStatus === messaging.AuthorizationStatus.PROVISIONAL; // Use the 'messaging' instance

  if (enabled) {
    console.log('Bildirim izni verildi');
    await getFCMToken();
  }
};

export const getFCMToken = async () => {
  const token = await messaging.getToken(); // Use the 'messaging' instance
  console.log('FCM Token:', token);
  return token;
};

export const setupForegroundNotifications = () => {
  return messaging.onMessage(async remoteMessage => { // Use the 'messaging' instance
    console.log('Foreground bildirim alındı:', remoteMessage);

    if (remoteMessage) {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Yeni Bildirim',
        body: remoteMessage.notification?.body || 'Bildirime dokunun',
        android: {
          channelId: 'varsayılan',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'varsayılan',
          },
          sound: 'lumos_sound_effect',
        },
      });
    }
  });
};

export const setupBackgroundNotifications = () => {
  messaging.setBackgroundMessageHandler(async remoteMessage => { 
    console.log('Arkaplan bildirimi alındı:', remoteMessage);
  });
};

export const checkInitialNotification = async () => {
  const remoteMessage = await messaging.getInitialNotification();
  if (remoteMessage) {
    console.log('Uygulama bildirimle açıldı:', remoteMessage);
  }
};

export const createDefaultChannel = async () => {
  await notifee.createChannel({
    id: 'varsayılan',
    name: 'Varsayılan Kanal',
    importance: AndroidImportance.HIGH,
  });
};