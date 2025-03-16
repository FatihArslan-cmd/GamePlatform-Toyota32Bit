import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import FormSection from './components/FormSection/FormSection';
import LogoSection from './components/LogoSection';
import LinearGradient from 'react-native-linear-gradient';
import SavedUserSection from './components/RememberMeModal/ProfileSection/SavedUserSection';
import { hideNavigationBar } from '../../utils/NavBarManager';
import { FormProvider } from './context/FormContext';
import { PermissionsProvider } from './context/PermissionContext';
import LanguageSelector from './components/LanguageSelector';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

const LoginScreen = () => {
  useEffect(() => {
    hideNavigationBar();
  }, []);

  const { colors, resolvedTheme } = useTheme(); // Use ThemeContext and get resolvedTheme

  // Define gradient colors based on the theme
  const gradientColors = resolvedTheme === 'dark' ? ['#1a1b2e', '#2d0a3e', '#1a1b2e'] : colors.loginScreenGradient;


  return (
      <FormProvider>
        <PermissionsProvider>
          <StatusBar translucent backgroundColor="transparent" />
          <LinearGradient
            colors={gradientColors}
            locations={[0, 0.5, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
          >
            <ThemeSwitcher/>
            <LanguageSelector/>
            <LogoSection />
            <FormSection />
            <SavedUserSection />
          </LinearGradient>
        </PermissionsProvider>
      </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default LoginScreen;