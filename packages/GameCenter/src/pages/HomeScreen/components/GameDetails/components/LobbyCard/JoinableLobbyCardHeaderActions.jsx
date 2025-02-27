import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinableLobbyCardHeaderActions = ({ copyLobbyCodeToClipboard, lobbyCode, lobby }) => {
  return (
    <View style={styles.cardHeaderActions}>
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={() => copyLobbyCodeToClipboard(lobbyCode)}
      >
        <Icon name="code-tags" size={20} color="#666" />
        <Text style={styles.lobbyCode}>{lobbyCode}</Text>
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        {lobby.hasPassword && (
          <Icon name="lock" size={24} color="black" style={styles.headerIcon} />
        )}
        {lobby.gameStarted && (
          <View style={styles.gameStartedContainer}>
            <Icon name="run-fast" size={24} color="#FF6F61" style={styles.headerIcon} />
            <Text style={styles.gameStartedText}>Started</Text>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  cardHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lobbyCode: {
    marginLeft: 5,
    fontFamily: 'Orbitron-ExtraBold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 10,
  },
  gameStartedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  gameStartedText: {
    marginLeft: 5,
    color: '#FF6F61',
    fontFamily: 'Orbitron-ExtraBold',
  }
});

export default JoinableLobbyCardHeaderActions;