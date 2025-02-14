import React , {useContext, useState, useCallback} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../context/ToastService';
import { UserContext } from '../../../../../context/UserContext';
import CustomModal from '../../../../../components/CustomModal';
import useLobbyActions from './hooks/useLobbyActions';
import LobbyDetails from './LobbyDetails';

const LobbyCard = ({ lobby, onLobbyAction }) => {
  const { user } = useContext(UserContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const { handleDeleteLobby, handleLeaveLobby } = useLobbyActions(onLobbyAction);

  const copyLobbyCodeToClipboard = useCallback(async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', 'Lobby code successfully copied!');
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', 'Failed to copy lobby code.');
    }
  }, []);

  const onDeleteConfirmation = useCallback(async () => {
    setDeleteModalVisible(false);
    await handleDeleteLobby(lobby.id);
  }, [handleDeleteLobby, lobby.id]);

  const onLeaveConfirmation = useCallback(async () => {
    setLeaveModalVisible(false);
    await handleLeaveLobby(lobby.id);
  }, [handleLeaveLobby, lobby.id]);


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
          {user && user.username === lobby.ownerUsername ? (
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
              <Icon
                name="close"
                size={24}
                color="red"
                style={styles.iconButton}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <Card.Content>
        <Title style={styles.lobbyName}>{lobby.lobbyName}</Title>
        <LobbyDetails lobby={lobby} /> 
        <View style={[
          styles.actionButtons,
          !(user && user.username === lobby.ownerUsername) && styles.actionButtonsCenter
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

      </Card.Content>

      <CustomModal
        visible={deleteModalVisible}
        onDismiss={() => setDeleteModalVisible(false)}
        onConfirm={onDeleteConfirmation}
        title="Delete Lobby?"
        text="Are you sure you want to delete this lobby? This action cannot be undone."
        confirmText="Delete Lobby"
        showConfirmButton={true}
      />

      <CustomModal
        visible={leaveModalVisible}
        onDismiss={() => setLeaveModalVisible(false)}
        onConfirm={onLeaveConfirmation}
        title="Leave Lobby?"
        text="Are you sure you want to leave this lobby?"
        confirmText="Leave Lobby"
        showConfirmButton={true}
      />
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
      fontFamily: 'Orbitron-ExtraBold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-ExtraBold',
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
  actionButtonsCenter: { // New style for centering buttons
    justifyContent: 'center',
  },
  leaveButton: {
    width: '100%', // Full width when centered
    backgroundColor: '#FF5722',
    marginBottom: 10, // Added bottom margin here
  },
  joinButton: {
    width: '48%', // Not used anymore, but kept for reference
    backgroundColor: '#4CAF50', // Not used anymore, but kept for reference
  },
});

export default LobbyCard;