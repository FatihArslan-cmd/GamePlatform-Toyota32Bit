import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';

const NoLobby = () => {
  return (
    <Surface style={styles.noLobbyContainer}>
      <Text style={styles.noLobbyText}>No Active Lobby</Text>
      <Button mode="contained" onPress={() => {}}>
        Create Lobby
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  noLobbyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noLobbyText: {
    marginBottom: 20,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default NoLobby;