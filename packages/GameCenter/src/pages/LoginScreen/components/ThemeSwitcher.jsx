import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../context/ThemeContext';
import { ToastService } from '../../../context/ToastService';

const ThemeSwitcher = () => {
  const { theme, setTheme,colors } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    ToastService.show('succes', `Theme switched to ${newTheme} mode`); 
  };

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={toggleTheme} style={styles.button}>
        <MaterialCommunityIcons
          name={isDarkMode ? "weather-night" : "weather-sunny"}
          size={24}
          color={colors.text}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(135, 135, 135, 0.1)',
    padding: 8,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeSwitcher;