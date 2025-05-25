import AboutSection from "./components/AboutSection";
import Header from "./components/Header/Header";
import LanguageSection from "./components/LanguageSection";
import NotificationSection from "./components/NotificationSection";
import ProfileSection from "./components/ProfileSection";
import React, { useEffect } from "react";
import ThemeSection from "./components/ThemeSection";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";
import { AnimatedSection } from "../../components/Animations/EnteringPageAnimation";
import { useTheme } from "../../context/ThemeContext";
import { isTablet } from "../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const SettingsScreen = () => {
  const { theme, colors } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
  }, [colors.card, theme]);

  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor={colors.card} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Surface style={[styles.container, {  backgroundColor: colors.background }]}>
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          <View style={styles.content}>

            <AnimatedSection index={0}>
              <ProfileSection />
            </AnimatedSection>

            <AnimatedSection index={1}>
              <ThemeSection />
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
    zIndex:20
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    gap: TABLET_DEVICE ? 16 : 8,
    padding: TABLET_DEVICE ? 16 : 2,
  },
});

export default SettingsScreen;