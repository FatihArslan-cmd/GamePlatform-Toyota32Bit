import GrandientText from "../../../components/GrandientText";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Card, List, Switch } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { ToastService } from "../../../context/ToastService";
import { isTablet } from "../../../utils/isTablet";
import { storage } from "../../../utils/storage";

const TABLET_DEVICE = isTablet();

const PUSH_NOTIFICATIONS_STORAGE_KEY = 'isPushNotificationsEnabled';
const EMAIL_NOTIFICATIONS_STORAGE_KEY = 'isEmailNotificationsEnabled';


const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);

  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const storedPushEnabled = storage.getBoolean(PUSH_NOTIFICATIONS_STORAGE_KEY);
    if (storedPushEnabled !== undefined) {
      setPushEnabled(storedPushEnabled);
    } else {
       storage.set(PUSH_NOTIFICATIONS_STORAGE_KEY, true);
       setPushEnabled(true);
    }

    const storedEmailEnabled = storage.getBoolean(EMAIL_NOTIFICATIONS_STORAGE_KEY);
    if (storedEmailEnabled !== undefined) {
        setEmailEnabled(storedEmailEnabled);
    } else {
        storage.set(EMAIL_NOTIFICATIONS_STORAGE_KEY, true);
        setEmailEnabled(true);
    }

  }, []);


  const saveNotificationSetting = (type, value) => {

    if (type === 'push') {
      setPushEnabled(value);
      storage.set(PUSH_NOTIFICATIONS_STORAGE_KEY, value);
    } else if (type === 'email') {
      setEmailEnabled(value);
       storage.set(EMAIL_NOTIFICATIONS_STORAGE_KEY, value);
    }

    const settingName = type === 'push'
      ? t('settingsScreen.notificationSection.pushNotifications')
      : t('settingsScreen.notificationSection.emailNotifications');
    const status = value
      ? t('settingsScreen.notificationSection.enabled').toLowerCase()
      : t('settingsScreen.notificationSection.disabled').toLowerCase();

    ToastService.show("info", `${settingName} ${status}`);
  };


  const handlePushToggle = (newValue) => {
    saveNotificationSetting('push', newValue);
  };

  const handleEmailToggle = (newValue) => {
     saveNotificationSetting('email', newValue);
  };

  const switchTrackColors = {
    false: colors.switchTrackOff || '#767577',
    true: colors.switchTrackOn || colors.primary + '60',
  };


  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text={t('settingsScreen.notificationSection.title')}
          colors={colors.languageTextGradient}
          textStyle={{ fontSize: TABLET_DEVICE ? 22 : 18, color: colors.text, marginBottom: 8 }}
          gradientDirection="horizontal"
        />

        <List.Item
          style={[styles.listItem, { backgroundColor: colors.card }]}
          title={t('settingsScreen.notificationSection.pushNotifications')}
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          description={t('settingsScreen.notificationSection.pushNotificationsDescription')}
          descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
          left={props => <List.Icon {...props} icon="bell" color={colors.primary} />}
          right={() => (
            <Switch
              value={pushEnabled}
              onValueChange={handlePushToggle}
              color={colors.primary}
              trackColor={switchTrackColors}
            />
          )}
        />

         <View style={styles.separator} />


        <List.Item
          style={[styles.listItem, { backgroundColor: colors.card }]}
          title={t('settingsScreen.notificationSection.emailNotifications')}
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          description={t('settingsScreen.notificationSection.emailNotificationsDescription')}
          descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
          left={props => <List.Icon {...props} icon="email" color={colors.primary} />}
           right={() => (
            <Switch
              value={emailEnabled}
              onValueChange={handleEmailToggle}
              color={colors.primary}
               trackColor={switchTrackColors}
            />
          )}
        />

      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listItem: {
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 16 : 12,
    flexShrink: 1,
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: TABLET_DEVICE ? 12 : 10,
    flexShrink: 1,
  },
   separator: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 8,
      marginHorizontal: 16,
  }
});

export default NotificationSection;