import React , {useContext, useState, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import { Card } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../context/ToastService';
import { UserContext } from '../../../../../context/UserContext';
import CustomModal from '../../../../../components/CustomModal';
import useLobbyActions from './hooks/useLobbyActions';
import LobbyCardHeaderActions from './LobbyCardHeaderActions';
import LobbyCardContent from './LobbyCardContent';
import PlayerModalContent from './PlayerModalContent'; // Import PlayerModalContent

const LobbyCard = ({ lobby, onLobbyAction }) => {
  const { user } = useContext(UserContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
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

  const togglePlayerModal = useCallback(() => {
    setPlayerModalVisible(!playerModalVisible);
  }, [playerModalVisible]);


  return (
    <Card style={styles.lobbyCard}>
      <LobbyCardHeaderActions
        copyLobbyCodeToClipboard={copyLobbyCodeToClipboard}
        lobbyCode={lobby.code}
        user={user}
        ownerUsername={lobby.ownerUsername}
        setDeleteModalVisible={setDeleteModalVisible}
      />

      <Card.Content>
        <LobbyCardContent
          lobby={lobby}
          user={user}
          ownerUsername={lobby.ownerUsername}
          setLeaveModalVisible={setLeaveModalVisible}
          togglePlayerModal={togglePlayerModal}
        />
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

      <CustomModal
        visible={playerModalVisible}
        onDismiss={togglePlayerModal}
        title="Players in Lobby"
        onConfirm={togglePlayerModal}
      >
        <PlayerModalContent
          lobby={lobby}
          user={user}
          togglePlayerModal={togglePlayerModal}
        />
      </CustomModal>
    </Card>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    elevation: 4,
  },
});

export default LobbyCard;