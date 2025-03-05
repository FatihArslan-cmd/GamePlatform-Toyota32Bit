import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import { ToastService } from '../../../context/ToastService';

const ThemeSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');

  const handlePress = () => setExpanded(!expanded);

  const handleThemeChange = (theme) => {
    if (selectedTheme === theme) {
      ToastService.show('info', 'This theme is already selected');
    } else {
      setSelectedTheme(theme);
      setExpanded(false);
      ToastService.show('success', `Theme changed to ${theme}`);
      // Here you would typically dispatch a theme change action
      // For example: dispatch(changeTheme(theme))
    }
  };

  const getThemeIcon = (theme) => {
    switch (theme) {
      case 'system':
        return 'theme-light-dark';
      case 'light':
        return 'white-balance-sunny';
      case 'dark':
        return 'moon-waning-crescent';
      default:
        return 'theme-light-dark';
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <GrandientText
          text="Theme"
          colors={['#FF6B6B', '#FFD93D', 'red', 'blue', 'green', 'purple']}
          textStyle={{ fontSize: 22 }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          title="Choose Theme"
          descriptionStyle={{fontFamily:'Orbitron-VariableFont_wght'}}
          description={selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1) + ' Mode'}
          left={props => <List.Icon {...props} color="#6366F1" icon="palette" />}
        >
          <List.Item
            title="System Default"
            onPress={() => handleThemeChange('system')}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => selectedTheme === 'system' ? <List.Icon icon="check" /> : null}
          />
          <List.Item
            title="Light Mode"
            onPress={() => handleThemeChange('light')}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            left={props => <List.Icon {...props} icon="white-balance-sunny" />}
            right={() => selectedTheme === 'light' ? <List.Icon icon="check" /> : null}
          />
          <List.Item
            title="Dark Mode"
            onPress={() => handleThemeChange('dark')}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            left={props => <List.Icon {...props} icon="moon-waning-crescent" />}
            right={() => selectedTheme === 'dark' ? <List.Icon icon="check" /> : null}
          />
        </List.Accordion>
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
  }
});

export default ThemeSection;