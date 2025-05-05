import GrandientText from "../../../components/GrandientText";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, List } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { ToastService } from "../../../context/ToastService";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const { colors } = useTheme();
  const { t } = useTranslation();


  const handlePushToggle = () => {
    const newValue = !pushEnabled;
    setPushEnabled(newValue);
    if (newValue) {
      ToastService.show("info", t('settingsScreen.notificationSection.pushNotifications') + " " + t('settingsScreen.notificationSection.enabled').toLowerCase());
    } else {
      ToastService.show("info", t('settingsScreen.notificationSection.pushNotifications') + " " + t('settingsScreen.notificationSection.disabled').toLowerCase()); 
    }
  };

  const handleEmailToggle = () => {
    const newValue = !emailEnabled;
    setEmailEnabled(newValue);
    if (newValue) {
      ToastService.show("info",  t('settingsScreen.notificationSection.emailNotifications') + " " + t('settingsScreen.notificationSection.enabled').toLowerCase()); 
    } else {
      ToastService.show("info", t('settingsScreen.notificationSection.emailNotifications') + " " + t('settingsScreen.notificationSection.disabled').toLowerCase());
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text={t('settingsScreen.notificationSection.title')} 
          colors={colors.languageTextGradient}
          textStyle={{ fontSize: TABLET_DEVICE ? 22 : 18, color: colors.text }}
          gradientDirection="horizontal"
        />
        <TouchableOpacity onPress={handlePushToggle} style={styles.listItemContainer}>
          <List.Item
            style={{ backgroundColor: colors.card }}
            title={t('settingsScreen.notificationSection.pushNotifications')} 
            titleStyle={[styles.titleStyle, { color: colors.text }]}
            description={t('settingsScreen.notificationSection.pushNotificationsDescription')} 
            descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
            left={props => <List.Icon {...props} icon="bell" color={colors.primary} />}
            right={() => (
              <GrandientText
                text={pushEnabled ? t('settingsScreen.notificationSection.enabled') : t('settingsScreen.notificationSection.disabled')} 
                colors={pushEnabled ? ['green', 'darkgreen'] : ['red', 'darkred']}
                textStyle={[styles.rightTextStyle, { color: colors.text }]}
                gradientDirection="horizontal"
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmailToggle} style={styles.listItemContainer}>
          <List.Item
            style={{ backgroundColor: colors.card }}
            title={t('settingsScreen.notificationSection.emailNotifications')} 
            titleStyle={[styles.titleStyle, { color: colors.text }]}
            description={t('settingsScreen.notificationSection.emailNotificationsDescription')}
            descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
            left={props => <List.Icon {...props} icon="email" color={colors.primary} />}
            right={() => (
              <GrandientText
                text={emailEnabled ?  t('settingsScreen.notificationSection.enabled') : t('settingsScreen.notificationSection.disabled')}
                colors={emailEnabled ? ['green', 'darkgreen'] : ['red', 'darkred']}
                textStyle={[styles.rightTextStyle, { color: colors.text }]}
                gradientDirection="horizontal"
              />
            )}
          />
        </TouchableOpacity>

      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 16 : 12
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: TABLET_DEVICE ? 12 : 10,
  },
  rightTextStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 12 : 10,
  },
});

export default NotificationSection;