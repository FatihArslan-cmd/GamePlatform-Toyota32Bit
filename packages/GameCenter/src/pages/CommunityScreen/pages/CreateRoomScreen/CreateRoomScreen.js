import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createRoom } from '../../services/api';
import CommunityTopics from '../../components/Buttons/CommunityTopics';
import RoomHeader from './components/RoomHeader';
import RoomNameInput from './components/RoomNameInput';
import ImageSelector from './components/ImageSelector';
import CreateButton from './components/CreateButton';
import BackButton from '../../../../components/BackIcon';
import { ToastService } from '../../../../context/ToastService'; // Import ToastService
import { AnimatedSection } from '../../../../components/Animations/EnteringPageAnimation';

const CreateRoomScreen = () => {
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const navigation = useNavigation();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      ToastService.show("error", 'Room name cannot be empty'); // Use ToastService.show
      return;
    }
    if (!topic) {
      ToastService.show("error",'Please select a topic'); // Use ToastService.show
      return;
    }

    setLoading(true);

    try {
      await createRoom(roomName, topic, imageUri);
      ToastService.show("success", "Room created successfully!"); // Use ToastService.show
      setIsCreateSuccess(true);
      setTimeout(() => {
        navigation.goBack();
      },3000);
    } catch (err) {
      ToastService.show("error", err.message || "Failed to create room"); // Use ToastService.show
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelectAndCreate = (selectedTopic) => {
    setTopic(selectedTopic);
  };

  return (
    <ImageBackground // Wrap the SafeAreaView with ImageBackground
      source={require('../../../../locales/bgImages/purpleImage.jpg')} // Adjust path if necessary
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <BackButton />

              <AnimatedSection index={0}>
                <RoomHeader />
              </AnimatedSection>

              <View style={styles.inputContainer}>
                <AnimatedSection index={1}>
                  <RoomNameInput value={roomName} onChangeText={setRoomName} />
                </AnimatedSection>

                <View style={styles.topicSelectorContainer}>
                  <AnimatedSection index={2}>
                    <CommunityTopics
                      onTopicSelect={handleTopicSelectAndCreate}
                      selectedTopic={topic}
                    />
                  </AnimatedSection>
                </View>

                <AnimatedSection index={3}>
                  <ImageSelector
                    imageUri={imageUri}
                    onImageSelected={setImageUri}
                  />
                </AnimatedSection>

              </View>

              <AnimatedSection index={4}>
                <CreateButton onPress={handleCreateRoom} loading={loading} disabled={loading || isCreateSuccess} />
              </AnimatedSection>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { // Style for ImageBackground
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(201, 209, 218, 0.8)', // Semi-transparent background for SafeAreaView
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  topicSelectorContainer: {
    marginBottom: 15,
  },
});

export default CreateRoomScreen;