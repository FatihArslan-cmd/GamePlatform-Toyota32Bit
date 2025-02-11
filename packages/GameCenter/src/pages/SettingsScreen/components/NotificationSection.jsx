import React from 'react';
import {  StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import { CustomSwitch } from './CustomSwitch';
import { ToastService } from '../../../context/ToastService'; // Import ToastService. Adjust the path as needed

const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [marketingEnabled, setMarketingEnabled] = React.useState(false);

  const handlePushToggle = (newValue) => {
    setPushEnabled(newValue);
    if (newValue) {
      ToastService.show("info", "Push Notifications enabled");
    } else {
      ToastService.show("info", "Push Notifications disabled");
    }
  };

  const handleEmailToggle = (newValue) => {
    setEmailEnabled(newValue);
    if (newValue) {
      ToastService.show("info", "Email Notifications enabled");
    } else {
      ToastService.show("info", "Email Notifications disabled");
    }
  };

  const handleMarketingToggle = (newValue) => {
    setMarketingEnabled(newValue);
    if (newValue) {
      ToastService.show("info", "Marketing Emails enabled");
    } else {
      ToastService.show("info", "Marketing Emails disabled");
    }
  };


  return (
    <Card style={styles.card}>
      <Card.Content>
        <GrandientText
          text="Notifications"
          colors={['black', '#778899']}
          textStyle={{ fontSize: 22 }}
          gradientDirection="horizontal"
        />
        <List.Item
          title="Push Notifications"
          titleStyle={styles.titleStyle}
          description="Receive push notifications"
          descriptionStyle={styles.descriptionStyle}
          left={props => <List.Icon {...props} icon="bell" color="#6366F1" />}
          right={() => (
            <CustomSwitch
              value={pushEnabled}
              onValueChange={handlePushToggle}
            />
          )}
        />

        <List.Item
          title="Email Notifications"
          titleStyle={styles.titleStyle}
          description="Receive email updates"
          descriptionStyle={styles.descriptionStyle}
          left={props => <List.Icon {...props} icon="email" color="#6366F1" />}
          right={() => (
            <CustomSwitch
              value={emailEnabled}
              onValueChange={handleEmailToggle}
            />
          )}
        />

        <List.Item
          title="Marketing Emails"
          titleStyle={styles.titleStyle}
          description="Receive promotional emails"
          descriptionStyle={styles.descriptionStyle}
          left={props => <List.Icon {...props} icon="bullhorn" color="#6366F1" />}
          right={() => (
            <CustomSwitch
              value={marketingEnabled}
              onValueChange={handleMarketingToggle}
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
    marginVertical: 8,
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: 12,
    color: '#666',
  },
  switchContainer: {
    width: 48,
    height: 26,
    borderRadius: 13,
    padding: 2,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    elevation: 2,
  },
});

export default NotificationSection;