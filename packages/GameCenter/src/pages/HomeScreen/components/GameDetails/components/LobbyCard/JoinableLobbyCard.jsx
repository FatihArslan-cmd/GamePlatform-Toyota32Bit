import React, { useState, useCallback} from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../../context/ToastService';
import CustomModal from '../../../../../../components/CustomModal';
import JoinableLobbyCardHeaderActions from './JoinableLobbyCardHeaderActions';
import JoinableLobbyCardContent from './JoinableLobbyCardContent';
import lobbyService from '../../../Header/services/lobbyService';
import JoinLobbyModalContent from './JoinLobbyModalContent'; // Import the new component
import { useBingoWebSocket } from '../../../../../../context/BingoWebSocket/BingoWebSocket';

const JoinableLobbyCard = ({ lobby}) => {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [currentLobby] = useState(lobby);
  const [password, setPassword] = useState('');
    const { connectWebSocket } = useBingoWebSocket(); // messages eklendi

  const copyLobbyCodeToClipboard = useCallback(async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', 'Lobby code successfully copied!');
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', 'Failed to copy lobby code.');
    }
  }, []);

  const handleJoinLobby = async () => {
    setJoinModalVisible(false); // Close the modal
    try {
      if (currentLobby.hasPassword) {
        await lobbyService.joinLobby(currentLobby.code, password); // Call joinLobby service with password
      } else {
        await lobbyService.joinLobby(currentLobby.code); // Call joinLobby service without password
      }
      connectWebSocket(currentLobby.code);
      ToastService.show('success', 'Successfully joined lobby!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
          ToastService.show('error', error.response.data.message); // Show server error message
      }
    }
  };

  return (
    <Card style={styles.lobbyCard}>
      <JoinableLobbyCardHeaderActions
        copyLobbyCodeToClipboard={copyLobbyCodeToClipboard}
        lobbyCode={currentLobby.code}
        lobby={currentLobby} // Pass the lobby data here
      />

      <Card.Content>
        <JoinableLobbyCardContent
          lobby={currentLobby}
          setJoinModalVisible={setJoinModalVisible}
        />
      </Card.Content>

      <CustomModal
        visible={joinModalVisible}
        onDismiss={() => {setJoinModalVisible(false); setPassword('');}}
        title="Join Lobby?"
        text={currentLobby.hasPassword ? "This lobby is password protected. Please enter the password to join." : "Are you sure you want to join this lobby?"}
        confirmText="Join Lobby"
        showConfirmButton={true}
        onConfirm={handleJoinLobby} // Call handleJoinLobby on confirm
        backgroundColor="#333333" // Dark grey background for modal
        textColor="#ffffff" // White text color for modal text
        titleColor="#ffffff" // White title color for modal title
      >
        <JoinLobbyModalContent
          hasPassword={currentLobby.hasPassword}
          password={password}
          setPassword={setPassword}
        />
      </CustomModal>
    </Card>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    elevation: 4,
    borderRadius: 20,
    marginVertical: 20,
  },
});

export default JoinableLobbyCard;