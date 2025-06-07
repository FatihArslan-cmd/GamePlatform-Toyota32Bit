import notifee, { AndroidImportance } from "@notifee/react-native";
import { getApp } from "@react-native-firebase/app";
import { PermissionsAndroid, Platform } from "react-native";
import { storage } from "../storage";

import {
  getMessaging,
  AuthorizationStatus,
  onMessage,
  setBackgroundMessageHandler,
  getInitialNotification,
  requestPermission,
  getToken,
} from "@react-native-firebase/messaging";


const PUSH_NOTIFICATIONS_STORAGE_KEY = 'isPushNotificationsEnabled';

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
    await getFCMToken();
  }
};

export const getFCMToken = async () => {
  const token = await getToken(messaging);
  return token;
};

export const setupForegroundNotifications = () => {
  return onMessage(messaging, async (remoteMessage) => {
    const isPushEnabled = storage.getBoolean(PUSH_NOTIFICATIONS_STORAGE_KEY);

    if (isPushEnabled === false) {
      return;
    }


    if (remoteMessage) {
      const displayedNotifications = await notifee.getDisplayedNotifications();
      const notificationLimit = 3;


      if (displayedNotifications.length >= notificationLimit) {
        displayedNotifications.sort((a, b) => a.timeStamp - b.timeStamp);
        const oldestNotificationId = displayedNotifications[0].id;
        try {
            await notifee.cancelNotification(oldestNotificationId);
        } catch (error) {
        }
      }

      const notificationId = remoteMessage.messageId || `${Date.now()}`;

      await notifee.displayNotification({
        id: notificationId,
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
    const isPushEnabled = storage.getBoolean(PUSH_NOTIFICATIONS_STORAGE_KEY);

    if (isPushEnabled === false) {
       return;
    }
  });
};

export const checkInitialNotification = async () => {
  const remoteMessage = await getInitialNotification(messaging);
  if (remoteMessage) {
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