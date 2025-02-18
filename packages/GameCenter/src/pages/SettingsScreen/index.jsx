import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileSection from './components/ProfileSection';
import NotificationSection from './components/NotificationSection';
import AboutSection from './components/AboutSection';
import Header from './components/Header/Header';
import ThemeSection from './components/ThemeSection';
import BottomSheet from '../../components/themeswitch/BottomSheet';
import LanguageSection from './components/LanguageSection';
import { AnimatedSection } from '../../components/Animations/EnteringPageAnimation';

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState('system');

  const handleThemePress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView>
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.fixedHeader}>
            <Header />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          <View style={styles.content}>

            <AnimatedSection index={0}>
              <ProfileSection />
            </AnimatedSection>

            <AnimatedSection index={1}>
              <ThemeSection handleThemePress={handleThemePress} />
            </AnimatedSection>

            <AnimatedSection index={2}>
              <LanguageSection />
            </AnimatedSection>

            <AnimatedSection index={3}>
              <NotificationSection />
            </AnimatedSection>

            <AnimatedSection index={4}>
              <AboutSection />
            </AnimatedSection>

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
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex:2
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 70, // Add paddingTop to account for header height, adjust as needed. Assuming header height is around 70.
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});

export default SettingsScreen;