import {
    interpolate,
    withSpring,
    Extrapolate,
  } from 'react-native-reanimated';
  import { useAnimatedStyle } from 'react-native-reanimated';
  export const HEADER_SCROLL_DISTANCE = 750;
  export const BUTTONS_START_SCROLL_DISTANCE = 200;
  export const SPRING_CONFIG = {
    mass: 0.5,
    damping: 15,
    stiffness: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  
  export const useHeaderAnimatedStyle = (scrollY, appBarHeight) => {
    return useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [0, HEADER_SCROLL_DISTANCE],
        [0, -appBarHeight.value],
        { extrapolateRight: 'clamp' }
      );
  
      const opacity = interpolate(
        scrollY.value,
        [0, HEADER_SCROLL_DISTANCE],
        [1, 0],
        { extrapolate: Extrapolate.CLAMP }
      );
  
      return {
        transform: [{
          translateY: withSpring(translateY, SPRING_CONFIG)
        }],
        opacity: withSpring(opacity, SPRING_CONFIG),
      };
    }, [appBarHeight]);
  };
  
  export const useButtonsAnimatedStyle = (scrollY, buttonsBarHeight) => {
    return useAnimatedStyle(() => {
      const translateYButtons = interpolate(
        scrollY.value,
        [0, BUTTONS_START_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE],
        [0, 0, -buttonsBarHeight.value],
        { extrapolateRight: 'clamp' }
      );
  
      return {
        transform: [{
          translateY: withSpring(translateYButtons, SPRING_CONFIG)
        }]
      };
    }, [buttonsBarHeight]);
  };