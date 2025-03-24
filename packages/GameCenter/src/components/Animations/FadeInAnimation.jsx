import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const FadeIn = ({ 
  children, 
  duration = 500, 
  delay = 0,
  from = 0,
  to = 1,
}) => {
  const opacity = useSharedValue(from);
  const translateY = useSharedValue(20); 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    const easing = Easing.bezier(0.25, 0.1, 0.25, 1);

    opacity.value = withTiming(to, {
      duration,
      delay,
      easing,
    });

    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
      delay,
    });
  }, [duration, delay]);

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

export default FadeIn;