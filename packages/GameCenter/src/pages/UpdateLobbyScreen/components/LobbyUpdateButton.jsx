// src/components/LobbyUpdateButton.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LobbyUpdateButton = ({ loading, handleUpdateLobby }) => {
  return (
    <Button
      mode="contained"
      onPress={handleUpdateLobby}
      style={styles.updateButton}
      contentStyle={styles.buttonContent}
      loading={loading}
      disabled={loading}
      buttonColor="#8a2be2"
      icon={({ size, color }) => <Icon name="check" size={size} color={color} />}
    >
      <Text style={styles.updateButtonText}>
        {loading ? 'Updating...' : 'Update Lobby'}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    marginTop: 10,
    borderRadius: 12,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  updateButtonText: {
    fontFamily: 'Orbitron-ExtraBold',
    color: 'white',
  },
});

export default LobbyUpdateButton;