import FadeIn from "../../../../../components/Animations/FadeInAnimation";
import LobbyCard from "./components/LobbyCard";
import NoLobby from "../components/components/NoLobby";
import React, { useCallback, useEffect, useState } from "react";
import lobbyService from "../services/lobbyService";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { ToastService } from "../../../../../context/ToastService";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const ActiveLobbiesContent = ({ showNoLobby = true }) => {
  const [userLobby, setUserLobby] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const fetchLobbies = useCallback(async () => {
    setLoading(true);
    try {
      const lobby = await lobbyService.getUserLobby();
      setUserLobby(lobby);
    } catch (error) {
      console.error('Error fetching user lobby data:', error);
      ToastService.show('error', 'Failed to fetch lobby data.');
      setUserLobby(null);
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
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating={true} color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {userLobby ? (
        <FadeIn>
          <LobbyCard lobby={userLobby} onLobbyAction={handleLobbyUpdate} />
          </FadeIn>
      ) : (
        showNoLobby ?
        <FadeIn>
          <NoLobby />
        </FadeIn> : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: TABLET_DEVICE ? 10 : 0,
    justifyContent: 'center',
  },
});

export default ActiveLobbiesContent;