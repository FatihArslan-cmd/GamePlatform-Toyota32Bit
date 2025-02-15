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

import FadeIn from './Animations/FadeInAnimation';

const EmptyStateComponent = React.memo(({ message }) => {
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
    <FadeIn>
      <Animated.View
        style={[
          styles.container,
          animatedStyle, // Artık gerekmese de kalabilir, FadeIn kendi animasyonunu yapıyor
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
    </FadeIn>
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

const EmptyState = EmptyStateComponent;
export default EmptyState;