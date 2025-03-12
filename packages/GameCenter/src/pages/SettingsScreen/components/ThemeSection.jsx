import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import { ToastService } from '../../../context/ToastService';
import { useTheme } from '../../../context/ThemeContext';

const ThemeSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme, resolvedTheme, colors } = useTheme();

  const handlePress = () => setExpanded(!expanded);

  const handleThemeChange = (newTheme) => {
    if (theme === newTheme) {
      ToastService.show('info', 'This theme is already selected');
    } else {
      setTheme(newTheme);
      setExpanded(false);
      ToastService.show('success', `Theme changed to ${newTheme}`);
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
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text="Theme"
          colors={colors.themeTextGradient}
          textStyle={{ fontSize: 22, color: colors.text }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          style={{ backgroundColor: colors.card }}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          title="Choose Theme"
          descriptionStyle={{ fontFamily: 'Orbitron-VariableFont_wght', color: colors.subText }}
          description={theme.charAt(0).toUpperCase() + theme.slice(1) + ' Mode'}
          left={props => <List.Icon {...props} color={colors.primary} icon="palette" />}
          right={props => <List.Icon {...props} color={colors.subText} icon={expanded ? "chevron-up" : "chevron-down"} />} 
        >
          <List.Item
            title="System Default"
            onPress={() => handleThemeChange('system')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            left={props => <List.Icon {...props} icon={getThemeIcon('system')} color={colors.primary} />}
            right={() => theme === 'system' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title="Light Mode"
            onPress={() => handleThemeChange('light')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            left={props => <List.Icon {...props} icon={getThemeIcon('light')} color={colors.primary} />}
            right={() => theme === 'light' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title="Dark Mode"
            onPress={() => handleThemeChange('dark')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            left={props => <List.Icon {...props} icon={getThemeIcon('dark')} color={colors.primary} />}
            right={() => theme === 'dark' ? <List.Icon icon="check" color={colors.primary} /> : null}
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