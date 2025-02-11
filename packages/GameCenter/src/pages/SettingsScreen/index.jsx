import React from 'react';
import { View, StyleSheet, ScrollView,useColorScheme } from 'react-native';
import { Surface} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileSection from './components/ProfileSection';
import NotificationSection from './components/NotificationSection';
import AboutSection from './components/AboutSection';
import Header from './components/Header/Header';
import ThemeSection from './components/ThemeSection';
import BottomSheet from '../../components/themeswitch/BottomSheet'; // Import BottomSheet here
import { useRef, useState } from 'react'; // Import necessary hooks
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LanguageSection from './components/LanguageSection';
const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null); // Ref for BottomSheet
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState('system');

  const handleThemePress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView>
    <Surface style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <View style={styles.content}>
          <ProfileSection />
          <ThemeSection handleThemePress={handleThemePress} /> {/* Pass handleThemePress */}
          <LanguageSection />
          <NotificationSection />
          <AboutSection />
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        setTheme={setTheme}
        theme={theme}
        setThemeSwitch={setThemeSwitch}
        themeSwitch={themeSwitch}
      />
    </Surface>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});

export default SettingsScreen;