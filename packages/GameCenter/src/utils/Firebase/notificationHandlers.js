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
      const displayedNotifications = await notifee.getDisplayedNotifications();
      const notificationLimit = 3;

      console.log("Current displayed notifications count:", displayedNotifications.length);

      if (displayedNotifications.length >= notificationLimit) {
        console.log("Notification limit reached. Checking for oldest notification...");
        displayedNotifications.sort((a, b) => a.timeStamp - b.timeStamp);
        const oldestNotificationId = displayedNotifications[0].id;
        console.log("Oldest notification ID to cancel:", oldestNotificationId);
        try {
            await notifee.cancelNotification(oldestNotificationId);
            console.log(`Notification with ID ${oldestNotificationId} cancelled.`);
        } catch (error) {
            console.error(`Failed to cancel notification with ID ${oldestNotificationId}:`, error);
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

      console.log(`New notification displayed with ID: ${notificationId}`);
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
  console.log("Default channel created/ensured.");
};