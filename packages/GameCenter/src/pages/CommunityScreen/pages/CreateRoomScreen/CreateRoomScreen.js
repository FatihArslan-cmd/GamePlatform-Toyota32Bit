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
import ErrorDisplay from './Errordisplay';

const CreateRoomScreen = () => {
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError('Room name cannot be empty');
      return;
    }
    if (!topic) {
      setError('Please select a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createRoom(roomName, topic, imageUri);
      navigation.goBack();
    } catch (err) {
      setError(err.message || "Failed to create room");
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
              <RoomHeader />
              
              <View style={styles.inputContainer}>
                <RoomNameInput
                  value={roomName}
                  onChangeText={setRoomName}
                />

                <View style={styles.topicSelectorContainer}>
                  <CommunityTopics
                    onTopicSelect={handleTopicSelectAndCreate}
                    selectedTopic={topic}
                  />
                </View>

                <ImageSelector
                  imageUri={imageUri}
                  onImageSelected={setImageUri}
                  onError={setError}
                />

                <ErrorDisplay error={error} />
              </View>

              <CreateButton
                onPress={handleCreateRoom}
                loading={loading}
              />
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