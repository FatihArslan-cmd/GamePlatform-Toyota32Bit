import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import lobbyService from './services/lobbyService';
import LobbyCard from './components/LobbyCard';
import NoLobby from './components/NoLobby';
import { ToastService } from '../../../../context/ToastService';

const ActiveLobbiesContent = () => {
  const [userLobby, setUserLobby] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchLobbies = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const lobby = await lobbyService.getUserLobby(); // Use getUserLobby
      setUserLobby(lobby); // Directly set the fetched lobby
    } catch (error) {
      console.error('Error fetching user lobby data:', error);
      ToastService.show('error', 'Failed to fetch lobby data.');
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  }, []); 

  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

  if (loading) {
    return <View style={styles.container}><NoLobby loading={true} /></View>; // Or a loading spinner
  }

  return (
    <View style={styles.container}>
      {userLobby ? (
        <LobbyCard lobby={userLobby} />
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