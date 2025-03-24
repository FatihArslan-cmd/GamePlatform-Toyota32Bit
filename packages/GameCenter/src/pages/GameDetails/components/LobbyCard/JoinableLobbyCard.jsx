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
import {useTranslation} from 'react-i18next';

const JoinableLobbyCard = ({ lobby}) => {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [currentLobby] = useState(lobby);
  const [password, setPassword] = useState('');
  const { connectWebSocket } = useBingoWebSocket();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const copyLobbyCodeToClipboard = useCallback(async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', t('gameDetailsScreen.lobbyCodeCopied')); 
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', t('gameDetailsScreen.failedToCopyLobbyCode'));
    }
  }, [t]);

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
        title={t('gameDetailsScreen.joinLobbyModalTitle')}
        text={currentLobby.hasPassword ? t('gameDetailsScreen.joinLobbyModalPasswordProtectedText') : t('gameDetailsScreen.joinLobbyModalConfirmationText')}
        confirmText={t('gameDetailsScreen.joinLobbyButton')}
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