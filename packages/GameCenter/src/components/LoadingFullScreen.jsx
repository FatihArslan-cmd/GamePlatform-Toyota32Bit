import React, { memo, useEffect } from 'react';
import { StyleSheet, Dimensions,StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { hideNavigationBar } from '../utils/NavBarManager';
import FastImage from 'react-native-fast-image';
import games from '../pages/HomeScreen/components/VideoPlayBlock/components/games';

const { width } = Dimensions.get('window');

const LoadingFullScreen = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    hideNavigationBar();
  }, []);

  useEffect(() => {
    const imagesToPreload = games.map(game => ({ uri: game.imageUri }));
    FastImage.preload(imagesToPreload);
  }, []);

  useEffect(() => {
    scale.value = withRepeat(
      withSpring(1.1, { damping: 2, stiffness: 80 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <LinearGradient
      colors={['#4A00E0', '#8E2DE2']}
      style={styles.container}
    >
      <Animated.View 
        style={[styles.card]}
        entering={FadeIn.duration(600).easing(Easing.bezier(0.25, 0.1, 0.25, 1))}
      >
        <Animated.View style={pulseStyle}>
          <LottieView
            style={styles.lottie}
            source={require('../locales/lottie/LoadingGaming.json')}
            autoPlay
            loop
            speed={0.8}
          />
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(400).easing(Easing.bezier(0.25, 0.1, 0.25, 1))}
          style={styles.textContainer}
        >
          <Text style={styles.title}>We are navigating you!</Text>
          <Text style={styles.subtitle}>Get ready for the adventure</Text>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  card: {
    width: width * 0.85,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    color: '#fff',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
});

export default memo(LoadingFullScreen);