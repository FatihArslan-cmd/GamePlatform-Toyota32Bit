import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createRoom } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const CreateRoomScreen = () => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
        setError('Oda adı boş olamaz.');
        return;
    }

    try {
      await createRoom(roomName);
      navigation.goBack();
    } catch (err) {
        setError(err.message || "Oda oluşturulurken bir hata oluştu")
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Oda Adı"
        value={roomName}
        onChangeText={text => setRoomName(text)}
        style={styles.input}
      />
      {error ? (<Text style={styles.error}>{error}</Text>) : null}
      <Button mode="contained" onPress={handleCreateRoom}>
        Oda Oluştur
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});

export default CreateRoomScreen;