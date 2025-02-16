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
          labelStyle={styles.buttonLabel}
        >
          <Icon name="exit-run" size={20} color="white" />
          <Text style={styles.buttonText}>Leave</Text> 
        </Button>
      </View>
    </View>
  );
};

import { Text } from 'react-native'; // Import Text component

const styles = StyleSheet.create({
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-ExtraBold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
 
  leaveButton: {
    width: '100%', // Full width when centered
    backgroundColor: '#D32F2F', // Changed to a darker, more meaningful red
    marginBottom: 10, // Added bottom margin here
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center',     // Center content vertically
  },
  buttonLabel: { // Style for the button label (text)
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16, // Optional: Adjust font size if needed
  },
  buttonText: { // Style for the Text component inside Button
    color: 'white', // Keep text color white
  },
});

export default LobbyCardContent;