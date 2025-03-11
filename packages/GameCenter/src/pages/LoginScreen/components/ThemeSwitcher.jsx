import React, { useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Switch, Text, TouchableRipple, IconButton, Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeSwitcher = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  const toggleTheme = () => {
    const newThemeValue = !isDarkMode;
    setIsDarkMode(newThemeValue);
    if (onThemeChange) {
      onThemeChange(newThemeValue ? 'dark' : 'light');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={toggleTheme} style={styles.button}>
        <MaterialCommunityIcons
          name={isDarkMode ? "weather-night" : "weather-sunny"}
          size={24}
          color="white"
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeSwitcher;