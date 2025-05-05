import notifee, { AndroidImportance } from "@notifee/react-native";
import { getApp } from "@react-native-firebase/app";
import { PermissionsAndroid, Platform } from "react-native";

import {
  getMessaging,
  AuthorizationStatus,
  onMessage,
  setBackgroundMessageHandler,
  getInitialNotification,
  requestPermission,
  getToken,
} from "@react-native-firebase/messaging";

const messaging = getMessaging(getApp());

export const requestUserPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return;
    }
  }

  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Notification permission granted");
    await getFCMToken();
  }
};

export const getFCMToken = async () => {
  const token = await getToken(messaging);
  console.log("FCM Token:", token);
  return token;
};

export const setupForegroundNotifications = () => {
  return onMessage(messaging, async (remoteMessage) => {
    console.log("Foreground notification received:", remoteMessage);

    if (remoteMessage) {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || "New Notification",
        body: remoteMessage.notification?.body || "Tap to view",
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
          smallIcon: "ic_launcher",
          pressAction: {
            id: "default",
          },
          sound: "lumos_sound_effect",
        },
      });
    }
  });
};

export const setupBackgroundNotifications = () => {
  setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log("Background notification received:", remoteMessage);
  });
};

export const checkInitialNotification = async () => {
  const remoteMessage = await getInitialNotification(messaging);
  if (remoteMessage) {
    console.log("App opened via notification:", remoteMessage);
  }
};

export const createDefaultChannel = async () => {
  await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
    sound: "lumos_sound_effect",
  });
};
