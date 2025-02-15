import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinableLobbyCardHeaderActions = ({ copyLobbyCodeToClipboard, lobbyCode, isPasswordProtected=true }) => {
  return (
    <View style={styles.cardHeaderActions}>
      {isPasswordProtected && ( 
        <Icon name="lock" size={24} color="black" style={styles.lockIcon} /> 
      )}
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={() => copyLobbyCodeToClipboard(lobbyCode)}
      >
        <Icon name="code-tags" size={20} color="#666" />
        <Text style={styles.lobbyCode}>{lobbyCode}</Text>
      </TouchableOpacity>
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
  },
  iconButton: {
    marginLeft: 10,
  },
  lockIcon: { // Kilit ikonunun stili
    marginRight: 5, // Kod ile ikon arasında boşluk
  },
});

export default JoinableLobbyCardHeaderActions;