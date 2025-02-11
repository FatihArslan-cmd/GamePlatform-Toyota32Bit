import { SharedTransition, withTiming, Easing } from 'react-native-reanimated';

export const customTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withTiming(values.targetHeight, { duration: 500, easing: Easing.linear }), // 0.5 saniye, lineer easing
    width: withTiming(values.targetWidth, { duration: 500, easing: Easing.linear }),  // 0.5 saniye, lineer easing
    originX: withTiming(values.targetOriginX, { duration: 500, easing: Easing.linear }), // 0.5 saniye, lineer easing
    originY: withTiming(values.targetOriginY, { duration: 500, easing: Easing.linear }), // 0.5 saniye, lineer easing
  };
});