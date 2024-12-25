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
  const [showAppBar, setShowAppBar] = useState(true); // AppBar görünürlüğü
  const scrollY = new Animated.Value(0); // Scroll değeri
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
    const fetchGames = async () => {
      try {
        const storedGames = await getGamesFromStorage();
        console.log('Stored games:', storedGames);
        setGames(storedGames.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowAppBar(offsetY < 200); // 100 birimden fazla scroll yapıldığında AppBar gizlenir
      },
    }
  );

  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />
      {showAppBar && <AppBarExample />}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Daha akıcı scroll işlemi için
      >
        <FeaturedGames games={games} />
        <MiniGamesBlock games={games} />
        <FromTheCreator />
      </Animated.ScrollView>
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
