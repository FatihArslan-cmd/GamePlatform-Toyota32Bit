import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

import emptyStateAnimation from '../locales/lottie/EmptyState.json';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const EmptyStateComponent = React.memo(({ message, textColor = 'black' }) => { // textColor prop'unu ekledik ve default değeri 'black' olarak ayarladık
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 750 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
      ]}
    >
      <LottieView
        source={emptyStateAnimation}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      <Text style={[styles.textStyle, { color: textColor }]} >{message}</Text> {/* textColor prop'unu style'a uyguluyoruz */}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 250,
    height: 250,
  },
  textStyle:{
    fontSize:18,
    marginTop:20,
    fontFamily: 'Orbitron-ExtraBold',
  }
});

// React.memo ile sarmalanmış componenti export ediyoruz
const EmptyState = EmptyStateComponent;
export default EmptyState;