import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createRoom } from '../../services/api';
import CommunityTopics from '../../components/Buttons/CommunityTopics';
import RoomHeader from './RoomHeader';
import RoomNameInput from './RoomNameInput';
import ImageSelector from './ImageSelector';
import CreateButton from './CreateButton';
import BackButton from '../../../../components/BackIcon';
import { ToastService } from '../../../../context/ToastService'; // Import ToastService

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <BackButton />
            <RoomHeader />

            <View style={styles.inputContainer}>
              <RoomNameInput value={roomName} onChangeText={setRoomName} />

              <View style={styles.topicSelectorContainer}>
                <CommunityTopics
                  onTopicSelect={handleTopicSelectAndCreate}
                  selectedTopic={topic}
                />
              </View>

              <ImageSelector
                imageUri={imageUri}
                onImageSelected={setImageUri}
              />

            </View>

            <CreateButton onPress={handleCreateRoom} loading={loading} disabled={loading || isCreateSuccess} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
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