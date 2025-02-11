import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Surface} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileSection from './components/ProfileSection';
import NotificationSection from './components/NotificationSection';
import AboutSection from './components/AboutSection';
import Header from './components/Header/Header';

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Surface style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <View style={styles.content}>
          <ProfileSection />
          <NotificationSection />
          <AboutSection />
        </View>
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontWeight: 'bold',
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
