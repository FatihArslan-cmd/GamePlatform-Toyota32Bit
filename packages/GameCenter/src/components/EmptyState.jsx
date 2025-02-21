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

const EmptyStateComponent = React.memo(({ message }) => { // React.memo ile sarıyoruz
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
      <Text style={styles.textStyle} >{message}</Text>
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
    color:"black",
    fontSize:18,
    marginTop:20,
    fontFamily: 'Orbitron-ExtraBold',
  }
});

// React.memo ile sarmalanmış componenti export ediyoruz
const EmptyState = EmptyStateComponent;
export default EmptyState;