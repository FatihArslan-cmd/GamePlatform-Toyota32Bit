import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getGamesFromStorage } from '../../utils/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import ToastMessage from '../../components/ToastMessage/Toast';
import useToast from '../../components/ToastMessage/hooks/useToast';
import AppBarExample from './components/Header';
import FeaturedGames from './components/FeaturedGames';

const HomeScreen = () => {
  const { currentToast, showToast, hideToast } = useToast();
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.toastshow) {
      setTimeout(() => {
        showToast('success', 'Successfully logged in!');
      }, 750);
      navigation.setParams({ toastshow: false });
    }
  }, [route.params?.toastshow]);

  useEffect(() => {
    const storedGames = getGamesFromStorage();
    if (storedGames) {
      setGames(storedGames);
    }
  }, []);

  return (
    <View style={styles.container}>
      <AppBarExample />
      <FeaturedGames games={games} />
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
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;