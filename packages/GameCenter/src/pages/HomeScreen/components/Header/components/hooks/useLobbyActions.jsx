import { useCallback } from 'react';
import lobbyService from '../../services/lobbyService';
import { ToastService } from '../../../../../../context/ToastService';

const useLobbyActions = (onLobbyAction) => { // onLobbyAction to trigger refresh in parent

  const handleDeleteLobby = useCallback(async (lobbyId) => {
    try {
      await lobbyService.deleteLobby(lobbyId);
      ToastService.show('success', 'Lobby deleted successfully!');
      if (onLobbyAction) {
        onLobbyAction(); // Refresh lobby list in parent component after deletion
      }
      return true; // Indicate success
    } catch (error) {
      console.error("Error deleting lobby:", error);
      ToastService.show('error', error.response?.data?.message || 'Failed to delete lobby.');
      return false; // Indicate failure
    }
  }, [onLobbyAction]); // Dependencies for useCallback

  const handleLeaveLobby = useCallback(async (lobbyId) => {
    try {
      await lobbyService.leaveLobby(lobbyId);
      ToastService.show('success', 'Left lobby successfully!');
      if (onLobbyAction) {
        onLobbyAction(); // Refresh lobby list in parent component after leaving
      }
      return true; // Indicate success
    } catch (error) {
      console.error("Error leaving lobby:", error);
      ToastService.show('error', error.response?.data?.message || 'Failed to leave lobby.');
      return false; // Indicate failure
    }
  }, [onLobbyAction]); // Dependencies for useCallback

  const handleKickPlayer = useCallback(async (lobbyId, playerId) => {
    try {
      await lobbyService.kickPlayer(lobbyId, playerId); // Call kickPlayer in lobbyService
      if (onLobbyAction) {
        onLobbyAction(); // Refresh lobby list in parent if needed
      }
      return true;
    } catch (error) {
      console.error("Error kicking player:", error);
      ToastService.show('error', error.response?.data?.message || 'Failed to kick player.');
      return false;
    }
  }, [onLobbyAction]);

  const handleKickAndBlockPlayer = useCallback(async (lobbyId, playerId) => {
    try {
      await lobbyService.kickAndBlockPlayer(lobbyId, playerId); // Call kickAndBlockPlayer in lobbyService
      if (onLobbyAction) {
        onLobbyAction(); // Refresh lobby list if needed
      }
      return true;
    } catch (error) {
      console.error("Error kicking and blocking player:", error);
      ToastService.show('error', error.response?.data?.message || 'Failed to kick and block player.');
      return false;
    }
  }, [onLobbyAction]);


  return { handleDeleteLobby, handleLeaveLobby, handleKickPlayer, handleKickAndBlockPlayer }; // Include new handlers
};

export default useLobbyActions;