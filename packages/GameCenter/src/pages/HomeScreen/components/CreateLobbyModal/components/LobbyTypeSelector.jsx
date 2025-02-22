import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const LobbyTypeSelector = ({ lobbyType, onToggle }) => {
  return (
    <View style={styles.lobbyTypeContainer}>
      <Text style={styles.label}>Lobby Type</Text>
      <Button
        mode={lobbyType === 'Normal' ? 'contained' : 'outlined'}
        onPress={onToggle}
        style={styles.typeButton}
        labelStyle={{   fontFamily: 'Orbitron-ExtraBold',
        }}
      >
        {lobbyType === 'Normal' ? '🎮 Normal' : '📅 Event'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyTypeContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
  typeButton: {
    marginTop: 8,
    borderRadius: 20,
  },
});

export default LobbyTypeSelector;