import { View, StyleSheet, ScrollView, StatusBar, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getGamesFromStorage } from '../../utils/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import ToastMessage from '../../components/ToastMessage/Toast';
import useToast from '../../components/ToastMessage/hooks/useToast';
import AppBarExample from './components/Header';
import FeaturedGames from './components/FeaturedGames';
import MiniGamesBlock from './components/MiniGames';
import FromTheCreator from './components/FromTheCreator';

const HomeScreen = () => {
  const { currentToast, showToast, hideToast } = useToast();
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [showAppBar, setShowAppBar] = useState(true); // AppBar visibility
  const scrollY = new Animated.Value(0); // Scroll value
  const route = useRoute();

  // Fetch games from local storage on mount
  useEffect(() => {
    const loadGames = async () => {
      const storedGames = getGamesFromStorage();
      setGames(storedGames.results || []); // Update the state with games
    };

    loadGames();
  }, []);

  // Show toast on successful login
  useEffect(() => {
    if (route.params?.toastshow) {
      setTimeout(() => {
        showToast('success', 'Successfully logged in!');
      }, 750);
      navigation.setParams({ toastshow: false });
    }
  }, [route.params?.toastshow]);



  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />
      {showAppBar && <AppBarExample />}
      <ScrollView
      >
        <FeaturedGames games={games} />
        <MiniGamesBlock games={games} />
        <FromTheCreator />
      </ScrollView>
      {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 52,
  },
});

export default HomeScreen;
