import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';

const GameSelector = ({ gameName, lobbyName, maxCapacity, onMaxCapacityChange }) => {
  const validateCapacity = (value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1) {
      return false;
    }
    return true;
  };

  return (
    <>
      <TextInput
        label="Lobby Name"
        mode="outlined"
        value={lobbyName}
        placeholder="Enter lobby name..."
        left={<TextInput.Icon icon="home" />}
        style={styles.input}
      />

      <TextInput
        label={gameName ? "Selected Game" : "Select Game"}
        mode="outlined"
        value={gameName}
        placeholder="Search for a game..."
        left={<TextInput.Icon icon="gamepad-variant" />}
        style={styles.input}
        editable={!gameName}
      />

      <TextInput
        label="Max Capacity"
        mode="outlined"
        value={maxCapacity}
        onChangeText={onMaxCapacityChange}
        placeholder="Enter max players..."
        keyboardType="numeric"
        left={<TextInput.Icon icon="account-group" />}
        right={<TextInput.Icon icon="information" onPress={() => {}} />}
        style={styles.input}
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