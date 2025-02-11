import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
} from 'react-native-reanimated';
import ProfileSection from './components/ProfileSection';
import NotificationSection from './components/NotificationSection';
import AboutSection from './components/AboutSection';
import Header from './components/Header/Header';
import ThemeSection from './components/ThemeSection';
import BottomSheet from '../../components/themeswitch/BottomSheet';
import LanguageSection from './components/LanguageSection';
import { AnimatedSection } from '../../components/Animations/EnteringAnimation';

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState('system');

  const handleThemePress = () => {
    bottomSheetRef.current?.expand();
  };

  const sections = [
    { component: ProfileSection, props: {} },
    { component: ThemeSection, props: { handleThemePress } },
    { component: LanguageSection, props: {} },
    { component: NotificationSection, props: {} },
    { component: AboutSection, props: {} },
  ];

  return (
    <GestureHandlerRootView>
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View entering={FadeIn.duration(500)}>
            <Header />
          </Animated.View>

          <View style={styles.content}>
            {sections.map((Section, index) => (
              <AnimatedSection key={index} index={index}> {/* Use the imported AnimatedSection */}
                <Section.component {...Section.props} />
              </AnimatedSection>
            ))}
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