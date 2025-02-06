import { useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';

const HEADER_SCROLL_DISTANCE = 750; // Kaydırma mesafesi
const SPRING_CONFIG = {           // Yay animasyonu konfigürasyonu
  mass: 0.5,
  damping: 15,
  stiffness: 100,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const useHeaderAnimation = (scrollY, appBarHeight) => {
  const headerAnimatedStyle = useAnimatedStyle(() => {
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
      { extrapolateRight: 'clamp' }
    );

    return {
      transform: [{
        translateY: withSpring(translateY, SPRING_CONFIG)
      }],
      opacity: withSpring(opacity, SPRING_CONFIG), // Fade animation ekleniyor
    };
  }, [appBarHeight]);

  return headerAnimatedStyle;
};

export default useHeaderAnimation;