import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const RoomNameInput = ({ value, onChangeText }) => (
  <TextInput
    label="Room Name"
    value={value}
    onChangeText={onChangeText}
    style={styles.input}
    mode="outlined"
    left={<TextInput.Icon icon="account-group" />}  // Odayı temsil eden bir grup ikonu ekledim
    theme={{
      roundness: 10,
      colors: {
        primary: '#007bff',
        background: 'white'
      }
    }}
  />
);

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
});

export default RoomNameInput;