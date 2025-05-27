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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.card} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Surface style={[styles.container, {  backgroundColor: colors.background }]}>
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          <View style={styles.content}>

            <AnimatedSection index={0}>
              <ProfileSection index={0} />
            </AnimatedSection>

            <AnimatedSection index={1}>
              <ThemeSection index={1} />
            </AnimatedSection>

            <AnimatedSection index={2}>
              <LanguageSection index={2} />
            </AnimatedSection>

            <AnimatedSection index={3}>
              <NotificationSection index={3} />
            </AnimatedSection>

            <AnimatedSection index={4}>
              <AboutSection index={4} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    gap: TABLET_DEVICE ? 16 : 8,
    paddingHorizontal: TABLET_DEVICE ? 16 : 8,
    paddingVertical: 8,
  },
});

export default SettingsScreen;