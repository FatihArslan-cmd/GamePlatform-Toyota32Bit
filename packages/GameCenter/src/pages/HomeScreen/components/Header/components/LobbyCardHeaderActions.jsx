// LobbyCardHeaderActions.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LobbyCardHeaderActions = ({ copyLobbyCodeToClipboard, lobbyCode, user, ownerUsername, setDeleteModalVisible }) => {
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
        {user && user.username === ownerUsername ? (
          <TouchableRipple onPress={() => setDeleteModalVisible(true)}>
            <Icon
              name="close"
              size={24}
              color="red"
              style={styles.iconButton}
            />
          </TouchableRipple>
        ) : null}
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
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default LobbyCardHeaderActions;