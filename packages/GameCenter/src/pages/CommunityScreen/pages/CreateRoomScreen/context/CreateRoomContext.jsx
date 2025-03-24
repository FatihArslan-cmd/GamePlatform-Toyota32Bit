import React, { createContext, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createRoom } from '../../../services/roomApi';
import { ToastService } from '../../../../../context/ToastService';
import {useTranslation} from 'react-i18next';

const CreateRoomContext = createContext();

export const CreateRoomProvider = ({ children }) => {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const { t } = useTranslation();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      ToastService.show('error', t('communityScreen.roomNameEmptyError')); 
      return;
    }
    if (!topic) {
      ToastService.show('error', t('communityScreen.topicSelectionError')); 
      return;
    }

    setLoading(true);

    try {
      await createRoom(roomName, topic, imageUri);
      ToastService.show('success', t('communityScreen.roomCreationSuccess')); 
      setIsCreateSuccess(true);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (err) {
      ToastService.show('error', err.message || t('communityScreen.roomCreationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelectAndCreate = (selectedTopic) => {
    setTopic(selectedTopic);
  };

  const value = {
    roomName,
    setRoomName,
    topic,
    setTopic,
    imageUri,
    setImageUri,
    loading,
    setLoading,
    isCreateSuccess,
    setIsCreateSuccess,
    handleCreateRoom,
    handleTopicSelectAndCreate,
  };

  return (
    <CreateRoomContext.Provider value={value}>
      {children}
    </CreateRoomContext.Provider>
  );
};

export const useCreateRoom = () => {
  const context = useContext(CreateRoomContext);
  if (!context) {
    throw new Error('useCreateRoom must be used within a CreateRoomProvider');
  }
  return context;
};