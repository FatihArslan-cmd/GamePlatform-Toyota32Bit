import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileSection from './components/ProfileSection';
import NotificationSection from './components/NotificationSection';
import AboutSection from './components/AboutSection';
import Header from './components/Header/Header';
import LanguageSection from './components/LanguageSection';
import { AnimatedSection } from '../../components/Animations/EnteringPageAnimation';
import ThemeSection from './components/ThemeSection';
const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  

  return (
    <GestureHandlerRootView>
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
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
    gap: 16,
    padding: 16,
  },
});

export default SettingsScreen;