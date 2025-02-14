// LobbyCardContent.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LobbyDetails from './LobbyDetails'; // Assuming LobbyDetails is in the same directory

const LobbyCardContent = ({ lobby, user, ownerUsername, setLeaveModalVisible, togglePlayerModal }) => {
  return (
    <View>
      <Title style={styles.lobbyName}>{lobby.lobbyName}</Title>
      <TouchableOpacity onPress={togglePlayerModal}>
        <LobbyDetails lobby={lobby} />
      </TouchableOpacity>
      <View style={[
        styles.actionButtons,
        !(user && user.username === ownerUsername) && styles.actionButtonsCenter
      ]}>
        <Button
          mode="contained"
          onPress={() => setLeaveModalVisible(true)}
          style={styles.leaveButton}
        >
          <Icon name="exit-run" size={20} color="white" />
          Leave
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-ExtraBold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButtonsCenter: { // New style for centering buttons
    justifyContent: 'center',
  },
  leaveButton: {
    width: '100%', // Full width when centered
    backgroundColor: '#FF5722',
    marginBottom: 10, // Added bottom margin here
  },
});

export default LobbyCardContent;