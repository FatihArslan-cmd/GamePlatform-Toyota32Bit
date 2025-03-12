import React from 'react';
import {  StyleSheet, TouchableOpacity} from 'react-native';
import { Card, List } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import { ToastService } from '../../../context/ToastService';
import GradientDivider from '../../../components/GradientDivider';
import { useTheme } from '../../../context/ThemeContext';

const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const { colors } = useTheme();

  const handlePushToggle = () => {
    const newValue = !pushEnabled;
    setPushEnabled(newValue);
    if (newValue) {
      ToastService.show("info", "Push Notifications enabled");
    } else {
      ToastService.show("info", "Push Notifications disabled");
    }
  };

  const handleEmailToggle = () => {
    const newValue = !emailEnabled;
    setEmailEnabled(newValue);
    if (newValue) {
      ToastService.show("info", "Email Notifications enabled");
    } else {
      ToastService.show("info", "Email Notifications disabled");
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text="Notifications"
          colors={colors.languageTextGradient}
          textStyle={{ fontSize: 22, color: colors.text }}
          gradientDirection="horizontal"
        />
        <TouchableOpacity onPress={handlePushToggle} style={styles.listItemContainer}>
          <List.Item
            style={{ backgroundColor: colors.card }}
            title="Push Notifications"
            titleStyle={[styles.titleStyle, { color: colors.text }]}
            description="Receive push notifications"
            descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
            left={props => <List.Icon {...props} icon="bell" color={colors.primary} />}
            right={() => (
              <GrandientText
                text={pushEnabled ? "Enabled" : "Disabled"}
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
            title="Email Notifications"
            titleStyle={[styles.titleStyle, { color: colors.text }]}
            description="Receive email updates"
            descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
            left={props => <List.Icon {...props} icon="email" color={colors.primary} />}
            right={() => (
              <GrandientText
                text={emailEnabled ? "Enabled" : "Disabled"}
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
    marginVertical: 8,
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: 12,
  },
  rightTextStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 14,
  },
});

export default NotificationSection;