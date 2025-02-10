import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import { PermissionsAndroid } from 'react-native'; // PermissionsAndroid import'unu ekledim

// Firebase bildirim izni iste
export const requestUserPermission = async () => {
  if (Platform.OS === 'android') { // Sadece Android için izin iste
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bildirim izni reddedildi');
      return; // İzin reddedildiyse fonksiyondan çık
    }
  }

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

// Foreground bildirimlerini dinle ve göster (notifee ile)
export const setupForegroundNotifications = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground bildirim alındı:', remoteMessage);

    if (remoteMessage) {
      // Notifee bildirimi oluştur
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Yeni Bildirim', // Başlık yoksa varsayılan başlık
        body: remoteMessage.notification?.body || 'Bildirime dokunun', // Gövde yoksa varsayılan gövde
        android: {
          channelId: 'varsayılan', // Kanal ID'si (aşağıda oluşturulacak)
          importance: AndroidImportance.HIGH, // Bildirim önceliği
          smallIcon: 'ic_launcher', // Küçük ikon (android/app/src/main/res/drawable içinde olmalı)
          // largeIcon: 'https://my-cdn.io/logo.png', // Büyük ikon (isteğe bağlı)
          pressAction: {
            id: 'varsayılan',
          },
          // Android'e özel stil ayarları (isteğe bağlı)
          // style: {
          //   type: AndroidStyle.BIGTEXT,
          //   text: remoteMessage.notification?.body || 'Bildirim içeriği burada...',
          // },
        },
        // ios: { // iOS'e özel ayarlar (isteğe bağlı)
        //   foregroundPresentationOptions: [
        //     'badge', 'sound', 'alert'
        //   ],
        // },
      });
    }
  });
};

// Arkaplan/Closed durumunda bildirim işleme
export const setupBackgroundNotifications = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Arkaplan bildirimi alındı:', remoteMessage);
    // Arkaplanda bildirim işleme kodları buraya (isteğe bağlı)
    // Örneğin, veri tabanına kaydetme vb.
  });
};

// Uygulama kapalıyken açıldığında bildirim
export const checkInitialNotification = async () => {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log('Uygulama bildirimle açıldı:', remoteMessage);
    // Uygulama kapalıyken bildirime tıklanarak açıldığında yapılacak işlemler (isteğe bağlı)
  }
};

// Notifee kanalı oluştur (uygulama ilk açılışında veya uygun bir yerde çağırılabilir)
export const createDefaultChannel = async () => {
  await notifee.createChannel({
    id: 'varsayılan',
    name: 'Varsayılan Kanal', // Kullanıcıya gösterilecek kanal adı
    importance: AndroidImportance.HIGH, // Kanal önceliği (bildirimlerin nasıl davranacağını etkiler)
  });
};