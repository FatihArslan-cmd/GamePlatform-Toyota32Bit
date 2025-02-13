import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

const BackDrop = ({ translateY, openHeight, closeHeight, close }) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [closeHeight, openHeight],
      [0, 1]
    );
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View style={[styles.container, backDropAnimation]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={3}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.5)"
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BackDrop;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'none',
    position: 'absolute',

  },
});