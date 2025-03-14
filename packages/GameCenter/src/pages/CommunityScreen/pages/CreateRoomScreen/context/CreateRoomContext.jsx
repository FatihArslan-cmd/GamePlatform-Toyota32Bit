// contexts/CreateRoomContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createRoom } from '../../../services/roomApi';
import { ToastService } from '../../../../../context/ToastService';

// Context oluştur
const CreateRoomContext = createContext();

// Provider bileşeni
export const CreateRoomProvider = ({ children }) => {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  // Oda oluşturma fonksiyonu
  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      ToastService.show('error', 'Room name cannot be empty');
      return;
    }
    if (!topic) {
      ToastService.show('error', 'Please select a topic');
      return;
    }

    setLoading(true);

    try {
      await createRoom(roomName, topic, imageUri);
      ToastService.show('success', 'Room created successfully!');
      setIsCreateSuccess(true);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (err) {
      ToastService.show('error', err.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  // Konu seçme fonksiyonu
  const handleTopicSelectAndCreate = (selectedTopic) => {
    setTopic(selectedTopic);
  };

  // Context value'su
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

// Context'i kullanmak için özel hook
export const useCreateRoom = () => {
  const context = useContext(CreateRoomContext);
  if (!context) {
    throw new Error('useCreateRoom must be used within a CreateRoomProvider');
  }
  return context;
};