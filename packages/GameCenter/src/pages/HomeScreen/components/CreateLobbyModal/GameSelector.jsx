import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const GameSelector = ({
  gameName,
  lobbyName,
  maxCapacity,
  onGameNameChange,
  onLobbyNameChange,
  onMaxCapacityChange,
  editableGameName, 
}) => {
  return (
    <>
      <TextInput
        label="Lobby Name"
        mode="outlined"
        value={lobbyName}
        placeholder="Enter lobby name..."
        left={<TextInput.Icon icon="home" />}
        style={styles.input}
        onChangeText={onLobbyNameChange}
      />
 
      <TextInput
        label={gameName ? "Selected Game" : "Select Game"}
        mode="outlined"
        value={gameName}
        placeholder="Search for a game..."
        left={<TextInput.Icon icon="gamepad-variant" />}
        style={styles.input}
        editable={editableGameName}
        onChangeText={onGameNameChange}
      />

      <TextInput
        label="Max Capacity"
        mode="outlined"
        value={maxCapacity}
        placeholder="Enter max players..."
        keyboardType="numeric"
        left={<TextInput.Icon icon="account-group" />}
        right={<TextInput.Icon icon="information" onPress={() => {}} />}
        style={styles.input}
        onChangeText={onMaxCapacityChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default GameSelector;