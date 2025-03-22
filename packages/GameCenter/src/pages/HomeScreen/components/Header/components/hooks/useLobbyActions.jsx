import { useCallback } from 'react';
import lobbyService from '../../services/lobbyService';
import { ToastService } from '../../../../../../context/ToastService';
import { useBingoWebSocket } from '../../../../../../context/BingoGameWebsocket';
import { useTranslation } from 'react-i18next';

const useLobbyActions = (onLobbyAction) => {
  const { closeWebSocket } = useBingoWebSocket();
  const { t } = useTranslation();

  const handleDeleteLobby = useCallback(async (lobbyId) => {
    try {
      await lobbyService.deleteLobby(lobbyId);
      ToastService.show('success', t('homeScreen.lobbyDeletedSuccess'));
      if (onLobbyAction) {
        onLobbyAction();
      }
      closeWebSocket();
      return true;
    } catch (error) {
      console.error("Error deleting lobby:", error);
      ToastService.show('error', error.response?.data?.message || t('homeScreen.lobbyDeletedFailed')); 
      return false;
    }
  }, [onLobbyAction, closeWebSocket, t]);

  const handleLeaveLobby = useCallback(async (lobbyId) => {
    try {
      await lobbyService.leaveLobby(lobbyId);
      if (onLobbyAction) {
        onLobbyAction();
      }
      closeWebSocket();
      return true;
    } catch (error) {
      console.error("Error leaving lobby:", error);
      ToastService.show('error', error.response?.data?.message || t('homeScreen.lobbyLeaveFailed')); 
      return false;
    }
  }, [onLobbyAction, closeWebSocket, t]);

  const handleKickPlayer = useCallback(async (lobbyId, playerId) => {
    try {
      await lobbyService.kickPlayer(lobbyId, playerId);
      if (onLobbyAction) {
        onLobbyAction();
      }
      return true;
    } catch (error) {
      ToastService.show('error', error.response?.data?.message || t('homeScreen.playerKickFailed'));
      return false;
    }
  }, [onLobbyAction, t]);

  const handleKickAndBlockPlayer = useCallback(async (lobbyId, playerId) => {
    try {
      await lobbyService.kickAndBlockPlayer(lobbyId, playerId);
      if (onLobbyAction) {
        onLobbyAction();
      }
      return true;
    } catch (error) {
      console.error("Error kicking and blocking player:", error);
      ToastService.show('error', error.response?.data?.message || t('homeScreen.playerKickBlockFailed')); 
      return false;
    }
  }, [onLobbyAction, t]);


  return { handleDeleteLobby, handleLeaveLobby, handleKickPlayer, handleKickAndBlockPlayer };
};

export default useLobbyActions;