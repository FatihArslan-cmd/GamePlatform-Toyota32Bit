import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { getGamesFromStorage } from '../../utils/api';
import Header from './components/Header/Header';
import UpperBigAnimatedImages from './components/UpperBigAnimatedImages/UpperBigAnimatedImages';
import MiniGamesBlock from './components/MiniGames/MiniGames';
import FromTheCreator from './components/FromTheCreator/FromTheCreator';
import VideoPlayBlock from './components/VideoPlayBlock/VideoPlayBlock';
import useDisableBackButton from './hooks/useDisableBackButton';
import { hideNavigationBar } from '../../utils/NavBarManager';
import useHeaderAnimation from './hooks/useHeaderAnimation';
import { ToastService } from '../../context/ToastService';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const HomeScreen = () => {
  const [games, setGames] = useState([]);
  const appBarHeight = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!isScrolling.value) {
        isScrolling.value = true;
      }
      scrollY.value = event.contentOffset.y;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
    onMomentumEnd: () => {
      isScrolling.value = false;
    },
  });

  const headerAnimatedStyle = useHeaderAnimation(scrollY, appBarHeight);
  useEffect(() => {
    hideNavigationBar();
    const loadGames = async () => {
      const storedGames = getGamesFromStorage();
      setGames(storedGames.results || []);
    };

    loadGames();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ToastService.show('success', 'Successfully logged in!');
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  useDisableBackButton();

  const onLayout = (event) => {
    appBarHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <View style={styles.container}>
      
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Animated.View
        style={[styles.appBar, headerAnimatedStyle]}
        onLayout={onLayout}
      >
        <Header />
      </Animated.View>

      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={8}
        overScrollMode="never"
        bounces={false}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      >
        <UpperBigAnimatedImages games={games} />
        <MiniGamesBlock games={games} />  
        <FromTheCreator />
        <VideoPlayBlock />
      </AnimatedScrollView>

   
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
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default HomeScreen;