import messaging from '@react-native-firebase/messaging';

// Firebase bildirim izni iste
export const requestUserPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Bildirim izni verildi');
    await getFCMToken(); // Token'ı al
  }
};

// FCM Token'ı al
export const getFCMToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  // Bu token'ı backend'e gönderin
  return token;
};

// Foreground bildirimlerini dinle
export const setupForegroundNotifications = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground bildirim:', remoteMessage);
    // Bildirimi kullanıcıya göstermek için kütüphane kullanabilirsiniz
  });
};

// Arkaplan/Closed durumunda bildirim işleme
export const setupBackgroundNotifications = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Arkaplan bildirimi:', remoteMessage);
  });
};

// Uygulama kapalıyken açıldığında bildirim
export const checkInitialNotification = async () => {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log('Uygulama bildirimle açıldı:', remoteMessage);
  }
};