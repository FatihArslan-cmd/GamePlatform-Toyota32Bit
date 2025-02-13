import React from 'react';
import Animated, {
  SlideInRight,
} from 'react-native-reanimated';

export const AnimatedSection = ({ children, index }) => {
  const enteringAnimation = SlideInRight.delay(index * 200).springify()
    .damping(12)
    .stiffness(100)
    .mass(1.0);

  return (
    <Animated.View entering={enteringAnimation}>
      {children}
    </Animated.View>
  );
};