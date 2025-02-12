import React from 'react';
import {  StyleSheet, TouchableOpacity} from 'react-native';
import { Card, List } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import { ToastService } from '../../../context/ToastService';
import GradientDivider from '../../../components/GradientDivider';
const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);

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
    <Card style={styles.card}>
      <Card.Content>
        <GrandientText
          text="Notifications"
          colors={['black', '#778899']}
          textStyle={{ fontSize: 22 }}
          gradientDirection="horizontal"
        />
  <GradientDivider horizontalMargin='%10'  colorProps={['black', '#778899']}
                    />        <TouchableOpacity onPress={handlePushToggle} style={styles.listItemContainer}>
          <List.Item
            title="Push Notifications"
            titleStyle={styles.titleStyle}
            description="Receive push notifications"
            descriptionStyle={styles.descriptionStyle}
            left={props => <List.Icon {...props} icon="bell" color="#6366F1" />}
            right={() => (
              <GrandientText
                text={pushEnabled ? "Enabled" : "Disabled"}
                colors={pushEnabled ? ['green', 'darkgreen'] : ['red', 'darkred']}
                textStyle={styles.rightTextStyle}
                gradientDirection="horizontal"
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmailToggle} style={styles.listItemContainer}>
          <List.Item
            title="Email Notifications"
            titleStyle={styles.titleStyle}
            description="Receive email updates"
            descriptionStyle={styles.descriptionStyle}
            left={props => <List.Icon {...props} icon="email" color="#6366F1" />}
            right={() => (
              <GrandientText
                text={emailEnabled ? "Enabled" : "Disabled"}
                colors={emailEnabled ? ['green', 'darkgreen'] : ['red', 'darkred']}
                textStyle={styles.rightTextStyle}
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
    color: '#666',
  },
  rightTextStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: 14,
  },
  listItemContainer: {
    // Optional: Add styling if needed for the TouchableOpacity container
  }
});

export default NotificationSection;