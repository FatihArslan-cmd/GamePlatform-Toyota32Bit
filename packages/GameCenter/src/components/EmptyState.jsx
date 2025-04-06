import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import emptyStateAnimation from "../locales/lottie/EmptyState.json";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { isTablet } from "../utils/isTablet";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const TABLET_DEVICE = isTablet();

const EmptyStateComponent = React.memo(({ message, textColor = 'black' }) => { 
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
      <Text style={[styles.textStyle, { color: textColor }]} >{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: TABLET_DEVICE ? 250 : 125,
    height: TABLET_DEVICE ? 250 : 125,
  },
  textStyle:{
    fontSize: TABLET_DEVICE ? 18 : 14,
    marginTop:20,
    fontFamily: 'Orbitron-ExtraBold',
  }
});

const EmptyState = EmptyStateComponent;
export default EmptyState;