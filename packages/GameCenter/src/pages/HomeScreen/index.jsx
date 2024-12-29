import React, { useEffect, useState, useRef,useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import { getGamesFromStorage } from '../../utils/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import ToastMessage from '../../components/ToastMessage/Toast';
import useToast from '../../components/ToastMessage/hooks/useToast';
import Header from './components/Header';
import UpperBigAnimatedImages from './components/UpperBigAnimatedImages/UpperBigAnimatedImages';
import MiniGamesBlock from './components/MiniGames';
import FromTheCreator from './components/FromTheCreator';
import VideoPlayBlock from './components/VideoPlayBlock/VideoPlayBlock';
const HomeScreen = () => {
  const { currentToast, showToast, hideToast } = useToast();
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [appBarHeight, setAppBarHeight] = useState(0); // Dinamik yükseklik
  const scrollY = useRef(new Animated.Value(0)).current; // Scroll değeri
  const route = useRoute();

  const appBarTranslateY = useMemo(() => 
    scrollY.interpolate({
      inputRange: [0, 500],
      outputRange: [0, -appBarHeight],
      extrapolate: 'clamp',
    }), [scrollY, appBarHeight]
  );

  useEffect(() => {
    const loadGames = async () => {
      const storedGames = getGamesFromStorage();
      setGames(storedGames.results || []);
    };

    loadGames();
  }, []);

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
      <Animated.View
        style={[
          styles.appBar,
          { transform: [{ translateY: appBarTranslateY }] },
        ]}
        onLayout={(event) => {
          setAppBarHeight(event.nativeEvent.layout.height);
        }}
      >
        <Header />
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <UpperBigAnimatedImages games={games} />
        <MiniGamesBlock games={games} />
        <FromTheCreator />
        <VideoPlayBlock/>
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
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white', // AppBar arka plan rengi
    elevation: 4, // Android için gölge
  },
});

export default HomeScreen;
