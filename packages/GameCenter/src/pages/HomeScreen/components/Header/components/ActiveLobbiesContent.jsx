import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import lobbyService from '../services/lobbyService';
import LobbyCard from './components/LobbyCard';
import NoLobby from '../components/components/NoLobby';
import { ToastService } from '../../../../../context/ToastService';
import FadeIn from '../../../../../components/Animations/FadeInAnimation';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const ActiveLobbiesContent = ({ showNoLobby = true }) => {
  const [userLobby, setUserLobby] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme(); // Use the useTheme hook

  const fetchLobbies = useCallback(async () => {
    setLoading(true);
    try {
      const lobby = await lobbyService.getUserLobby();
      setUserLobby(lobby);
    } catch (error) {
      console.error('Error fetching user lobby data:', error);
      ToastService.show('error', 'Failed to fetch lobby data.');
      setUserLobby(null); // Set userLobby to null in case of error to show NoLobby component or handle no lobby case
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
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> {/* Themed background color for container */}
        {showNoLobby ? <NoLobby loading={true} />: null}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> {/* Themed background color for container */}
      {userLobby ? (
        <FadeIn><LobbyCard lobby={userLobby} onLobbyAction={handleLobbyUpdate} /></FadeIn>
      ) : (
        showNoLobby ? <FadeIn><NoLobby /></FadeIn> : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});

export default ActiveLobbiesContent;