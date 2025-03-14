import React, { useState, useCallback} from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../context/ToastService';
import CustomModal from '../../../../components/CustomModal';
import JoinableLobbyCardHeaderActions from './components/JoinableLobbyCardHeaderActions';
import JoinableLobbyCardContent from './components/JoinableLobbyCardContent';
import lobbyService from '../../../HomeScreen/components/Header/services/lobbyService';
import JoinLobbyModalContent from './components/JoinLobbyModalContent'; 
import { useBingoWebSocket } from '../../../../context/BingoGameWebsocket';
import { useTheme } from '../../../../context/ThemeContext'; 

const JoinableLobbyCard = ({ lobby}) => {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [currentLobby] = useState(lobby);
  const [password, setPassword] = useState('');
  const { connectWebSocket } = useBingoWebSocket();
  const { colors } = useTheme(); 

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
    setJoinModalVisible(false); 
    try {
      if (currentLobby.hasPassword) {
        await lobbyService.joinLobby(currentLobby.code, password); 
      } else {
        await lobbyService.joinLobby(currentLobby.code);
      }
      connectWebSocket(currentLobby.code);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
          ToastService.show('error', error.response.data.message); 
      }
    }
  };

  return (
    <Card style={[styles.lobbyCard, { backgroundColor: colors.card }]}> 
      <JoinableLobbyCardHeaderActions
        copyLobbyCodeToClipboard={copyLobbyCodeToClipboard}
        lobbyCode={currentLobby.code}
        lobby={currentLobby}
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
        onConfirm={handleJoinLobby} 
        backgroundColor={colors.card} 
        textColor={colors.text} 
        titleColor={colors.text} 
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