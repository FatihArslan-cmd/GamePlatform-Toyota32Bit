import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import lobbyService from './services/lobbyService';
import useToast from '../../../../components/ToastMessage/hooks/useToast';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import LobbyCard from './components/LobbyCard';
import NoLobby from './components/NoLobby';

const ActiveLobbiesContent = () => {
  const [userLobby, setUserLobby] = useState(null);
  const userId = 1; // Or retrieve user ID from your state/context
  const { currentToast, showToast, hideToast } = useToast();

  const fetchLobbies = useCallback(async () => {
    try {
      const data = await lobbyService.listLobbies();

      if (data?.lobbies) {
        const ownerLobby = data.lobbies.find((lobby) => lobby.ownerId === userId);
        setUserLobby(ownerLobby);
      }
    } catch (error) {
      console.error('Error fetching lobby data:', error);
      showToast('error', 'Failed to fetch lobby data.');
    }
  }, [userId, showToast]); 

  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

  return (
    <View style={styles.container}>
      {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
      {userLobby ? (
        <LobbyCard lobby={userLobby} showToast={showToast} hideToast={hideToast} />
      ) : (
        <NoLobby />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default ActiveLobbiesContent;