import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import CommunityTopics from './components/CommunityTopics';
import RoomHeader from './components/RoomHeader';
import RoomNameInput from './components/RoomNameInput';
import ImageSelector from './components/ImageSelector';
import CreateButton from './components/CreateButton';
import BackButton from '../../../../components/BackIcon';
import { AnimatedSection } from '../../../../components/Animations/EnteringPageAnimation';
import { CreateRoomProvider } from './context/CreateRoomContext';
import { useTheme } from '../../../../context/ThemeContext';

const CreateRoomScreen = () => {
  const { colors, resolvedTheme } = useTheme();

  const backgroundImageSource = resolvedTheme === 'dark'
    ? require('../../../../locales/bgImages/darkblurredimage.jpg')
    : require('../../../../locales/bgImages/purpleImage.jpg');

  return (
    <ImageBackground
      source={backgroundImageSource}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blurredImageBackground }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <BackButton />
              <View style={styles.headerContainer}>
                <AnimatedSection index={0}>
                  <RoomHeader />
                </AnimatedSection>
              </View>

                <AnimatedSection index={1}>
                  <RoomNameInput />
                </AnimatedSection>

              <View style={styles.topicSelectorContainer}>
                <AnimatedSection index={2}>
                  <CommunityTopics />
                </AnimatedSection>
              </View>

              <AnimatedSection index={3}>
                <ImageSelector />
              </AnimatedSection>

              <AnimatedSection index={4}>
                <CreateButton />
              </AnimatedSection>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 30,
  },
  scrollContent: {
    flexGrow: 1,
     justifyContent: 'center'
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  topicSelectorContainer: {
    marginBottom: 30,
  },
});

export default () => (
  <CreateRoomProvider>
    <CreateRoomScreen />
  </CreateRoomProvider>
);