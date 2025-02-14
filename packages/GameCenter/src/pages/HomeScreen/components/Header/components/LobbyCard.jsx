import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../context/ToastService'; // Import ToastService

const LobbyCard = ({ lobby }) => { // Removed showToast and hideToast props
  const copyLobbyCodeToClipboard = async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', 'Lobby code successfully copied!'); // Use ToastService.show
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', 'Failed to copy lobby code.'); // Use ToastService.show
    }
  };

  return (
    <Card style={styles.lobbyCard}>
      <View style={styles.cardHeaderActions}>
        <TouchableOpacity
          style={styles.codeContainer}
          onPress={() => copyLobbyCodeToClipboard(lobby.code)}
        >
          <Icon name="code-tags" size={20} color="#666" />
          <Text style={styles.lobbyCode}>{lobby.code}</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Icon
            name="update"
            size={24}
            color="#4a148c"
            onPress={() => {/* Update lobby */}}
            style={styles.iconButton}
          />
          <Icon
            name="close"
            size={24}
            color="red"
            onPress={() => {/* Close lobby */}}
            style={styles.iconButton}
          />
        </View>
      </View>

      <Card.Content>
        <Title style={styles.lobbyName}>{lobby.lobbyName}</Title>

        <View style={styles.typeBadge}>
          <Icon name="tag" size={16} color="#666" />
          <Text style={styles.lobbyType}>{lobby.lobbyType.toUpperCase()}</Text>
        </View>

        <View style={styles.lobbyDetails}>
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Icon name="crown" size={20} color="#FFD700" />
              <Text style={styles.detailLabel}>Owner</Text>
            </View>
            <Text>{lobby.ownerId}</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Icon name="account-group" size={20} color="#4a148c" />
              <Text style={styles.detailLabel}>Players</Text>
            </View>
            <Text>
              {lobby.members.length}/{lobby.maxCapacity}
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={() => {/* Leave lobby */}}
            style={styles.leaveButton}
          >
            <Icon name="exit-run" size={20} color="white" />
            Leave
          </Button>
          <Button
            mode="contained"
            onPress={() => {/* Join lobby */}}
            style={styles.joinButton}
          >
            <Icon name="account-plus" size={20} color="white" />
            Join
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    elevation: 4,
  },
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
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  lobbyType: {
    marginLeft: 5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  lobbyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    marginLeft: 5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leaveButton: {
    width: '48%',
    backgroundColor: '#FF5722',
  },
  joinButton: {
    width: '48%',
    backgroundColor: '#4CAF50',
  },
});

export default LobbyCard;