import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper'; // Import Text from react-native-paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LobbyDetails from '../../../HomeScreen/components/Header/components/components/LobbyDetails';

const JoinableLobbyCardContent = ({ lobby, setJoinModalVisible }) => {
  return (
    <View>
      <Title style={styles.lobbyName}>{lobby.lobbyName}</Title>
      <LobbyDetails lobby={lobby} />
      <View style={[
        styles.actionButtons,
        styles.actionButtonsCenter // Always center for Joinable Lobby
      ]}>
        <Button
          mode="contained"
          onPress={() => setJoinModalVisible(true)}
          style={styles.joinButton}
          labelStyle={[styles.buttonLabel, styles.buttonText]} // Apply text styles to labelStyle
          icon={() => <Icon name="login" size={20} color="white" />} // Use icon prop
        >
          Join 
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
    marginTop: 20,
  },
  actionButtonsCenter: {
    justifyContent: 'center', // Center buttons
  },
  joinButton: {
    width: '100%', // Full width when centered
    backgroundColor: '#4CAF50', // Green color for Join
    marginBottom: 10,
    justifyContent: 'center', // Ensure content is centered
    alignItems: 'center',     // Ensure content is centered
  },
  buttonLabel: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
  buttonText: {
    color: 'white', // Text color is now applied through buttonText style
  },
});

export default JoinableLobbyCardContent;