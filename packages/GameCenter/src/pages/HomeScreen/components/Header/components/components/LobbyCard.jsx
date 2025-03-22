import React , {useContext, useState, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import { Card } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../../context/ToastService';
import { UserContext } from '../../../../../../context/UserContext';
import CustomModal from '../../../../../../components/CustomModal';
import useLobbyActions from '../hooks/useLobbyActions';
import LobbyCardHeaderActions from './LobbyCardHeaderActions';
import LobbyCardContent from './LobbyCardContent';
import PlayerModalContent from './PlayerModalContent';
import { useTheme } from '../../../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const LobbyCard = ({ lobby, onLobbyAction }) => {
  const { user } = useContext(UserContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [currentLobby, setCurrentLobby] = useState(lobby);
  const { handleDeleteLobby, handleLeaveLobby, handleKickPlayer, handleKickAndBlockPlayer } = useLobbyActions(onLobbyAction);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const copyLobbyCodeToClipboard = useCallback(async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', t('homeScreen.lobbyCodeCopied')); 
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', t('homeScreen.lobbyCodeCopyFailed'));
    }
  }, [t]);

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

  const handlePlayerAction = useCallback(async (playerId, actionType) => {
    if (user.username !== currentLobby.ownerUsername) {
      ToastService.show('error', t('homeScreen.onlyOwnerAction')); 
      setPlayerModalVisible(false);
      return;
    }

    try {
      let success = false;
      if (actionType === 'kick') {
        success = await handleKickPlayer(currentLobby.id, playerId);
      } else if (actionType === 'kickAndBlock') {
        success = await handleKickAndBlockPlayer(currentLobby.id, playerId);
      }

      if (success) {
        setCurrentLobby(prevLobby => ({
          ...prevLobby,
          members: prevLobby.members.filter(member => member.id !== playerId),
        }));
        ToastService.show('success', t(`homeScreen.playerActionSuccess`, { action: t(`homeScreen.${actionType}`) })); 
      } else {
        ToastService.show('error', t(`homeScreen.playerActionFailed`, { action: t(`homeScreen.${actionType}`) })); 
      }
    } catch (error) {
      console.error(`Error performing player action (${actionType}):`, error);
      ToastService.show('error', t(`homeScreen.playerActionFailed`, { action: t(`homeScreen.${actionType}`) })); 
    } finally {
      setPlayerModalVisible(false);
    }
  }, [handleKickPlayer, handleKickAndBlockPlayer, currentLobby.id, currentLobby.ownerUsername, user.username, t]);


  return (
    <Card style={[styles.lobbyCard, { backgroundColor: colors.card }]}>
      <LobbyCardHeaderActions
        copyLobbyCodeToClipboard={copyLobbyCodeToClipboard}
        lobbyCode={currentLobby.code}
        ownerUsername={currentLobby.ownerUsername}
        setDeleteModalVisible={setDeleteModalVisible}
      />

      <Card.Content>
        <LobbyCardContent
          lobby={currentLobby}
          ownerUsername={currentLobby.ownerUsername}
          setLeaveModalVisible={setLeaveModalVisible}
          togglePlayerModal={togglePlayerModal}
        />
      </Card.Content>

      <CustomModal
        visible={deleteModalVisible}
        onDismiss={() => setDeleteModalVisible(false)}
        onConfirm={onDeleteConfirmation}
        title={t('homeScreen.deleteLobbyModalTitle')} 
        text={t('homeScreen.deleteLobbyModalDescription')}
        confirmText={t('homeScreen.deleteLobbyModalConfirmButton')} 
        showConfirmButton={true}
      />

      <CustomModal
        visible={leaveModalVisible}
        onDismiss={() => setLeaveModalVisible(false)}
        onConfirm={onLeaveConfirmation}
        title={t('homeScreen.leaveLobbyModalTitle')} 
        text={t('homeScreen.leaveLobbyModalDescription')} 
        confirmText={t('homeScreen.leaveLobbyModalConfirmButton')} 
        showConfirmButton={true}
      />

      <CustomModal
        visible={playerModalVisible}
        onDismiss={togglePlayerModal}
        title={t('homeScreen.playersInLobbyModalTitle')} 
        onConfirm={togglePlayerModal}
      >
        <PlayerModalContent
          lobby={currentLobby}
          onPlayerAction={handlePlayerAction}
        />
      </CustomModal>
    </Card>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    elevation: 2,
    borderRadius: 20,
  },
});

export default LobbyCard;