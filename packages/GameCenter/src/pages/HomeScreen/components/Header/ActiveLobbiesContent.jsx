import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import lobbyService from './services/lobbyService';
import LobbyCard from './components/LobbyCard';
import NoLobby from './components/NoLobby';
import { ToastService } from '../../../../context/ToastService';

const ActiveLobbiesContent = () => {
  const [userLobby, setUserLobby] = useState(null);
  const [loading, setLoading] = useState(true);

  // useCallback is important here to prevent re-creation of the function on every render
  // which would cause unnecessary re-renders in child components if passed as props.
  const fetchLobbies = useCallback(async () => {
    setLoading(true);
    try {
      const lobby = await lobbyService.getUserLobby();
      setUserLobby(lobby);
    } catch (error) {
      console.error('Error fetching user lobby data:', error);
      ToastService.show('error', 'Failed to fetch lobby data.');
      setUserLobby(null); // Set userLobby to null in case of error to show NoLobby component
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

  const handleLobbyUpdate = useCallback(() => {
    fetchLobbies(); 
  }, [fetchLobbies]);


  if (loading) {
    return <View style={styles.container}><NoLobby loading={true} /></View>;
  }

  return (
    <View style={styles.container}>
      {userLobby ? (
        <LobbyCard lobby={userLobby} onLobbyAction={handleLobbyUpdate} />
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