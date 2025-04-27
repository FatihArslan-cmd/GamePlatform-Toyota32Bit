import Animated from "react-native-reanimated";
import FromTheCreator from "./components/FromTheCreator/FromTheCreator";
import Header from "./components/Header/Header";
import MiniGamesBlock from "./components/MiniGames/MiniGames";
import React, { useEffect, useState } from "react";
import UpperBigAnimatedImages from "./components/UpperBigAnimatedImages/UpperBigAnimatedImages";
import VideoPlayBlock from "./components/VideoPlayBlock/VideoPlayBlock";
import useDisableBackButton from "./hooks/useDisableBackButton";
import useHeaderAnimation from "./hooks/useHeaderAnimation";
import { useTheme } from "../../context/ThemeContext";
import { hideNavigationBar } from "../../utils/NavBarManager";
import { getGamesFromStorage } from "../../utils/api";

import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const HomeScreen = () => {
  const [games, setGames] = useState([]);
  const { headerAnimatedStyle, scrollHandler, onLayout } = useHeaderAnimation();
  const { resolvedTheme } = useTheme(); 

  useEffect(() => {
    hideNavigationBar();
    const loadGames = async () => {
      const storedGames = getGamesFromStorage();
      setGames(storedGames.results || []);
    };

    loadGames();
  }, []);

  useDisableBackButton();


  return (
    <View style={styles.container}>

      <StatusBar translucent backgroundColor="transparent" barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'} />
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
    elevation: 4,
  },
});

export default HomeScreen;