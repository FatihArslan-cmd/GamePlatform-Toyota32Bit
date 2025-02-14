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

  return { handleDeleteLobby, handleLeaveLobby };
};

export default useLobbyActions;