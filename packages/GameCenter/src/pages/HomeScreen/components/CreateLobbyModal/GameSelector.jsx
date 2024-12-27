import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const GameSelector = ({ game, onGameChange }) => {
  return (
    <TextInput
      label="Select Game"
      mode="outlined"
      value={game}
      onChangeText={onGameChange}
      placeholder="Search for a game..."
      left={<TextInput.Icon icon="gamepad-variant" />}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
});

export default GameSelector;