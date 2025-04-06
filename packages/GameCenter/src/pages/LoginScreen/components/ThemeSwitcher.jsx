import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { ToastService } from "../../../context/ToastService";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const ThemeSwitcher = () => {
  const { theme, setTheme, colors } = useTheme();
  const { t } = useTranslation();

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    ToastService.show('success', `${t('themeSwitcher.themeSwitched')} ${t(`themeSwitcher.${newTheme}`)}`);
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={toggleTheme}
        style={styles.button}
        rippleColor={colors.ripple} 
        borderless={true} 
      >
        <MaterialCommunityIcons
          name={isDarkMode ? "weather-night" : "weather-sunny"}
          size={TABLET_DEVICE ? 28 : 22} 
          color={colors.text}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: TABLET_DEVICE ? 50 : 40, 
    left: TABLET_DEVICE ? 30 : 15, 
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(135, 135, 135, 0.1)', 
    padding: TABLET_DEVICE ? 10 : 8,
    borderRadius: TABLET_DEVICE ? 24 : 20,
    width: TABLET_DEVICE ? 48 : 40,
    height: TABLET_DEVICE ? 48 : 40, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeSwitcher;