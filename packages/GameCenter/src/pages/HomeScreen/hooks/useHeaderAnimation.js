import { useAnimatedStyle, interpolate, withSpring, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

const HEADER_SCROLL_DISTANCE = 750;
const SPRING_CONFIG = {
  mass: 0.5,
  damping: 15,
  stiffness: 100,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const useHeaderAnimation = () => {
  const appBarHeight = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!isScrolling.value) {
        isScrolling.value = true;
      }
      scrollY.value = event.contentOffset.y;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
    onMomentumEnd: () => {
      isScrolling.value = false;
    },
  });

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
      opacity: withSpring(opacity, SPRING_CONFIG),
    };
  }, [appBarHeight]);

  const onLayout = (event) => {
    appBarHeight.value = event.nativeEvent.layout.height;
  };

  return {
    headerAnimatedStyle,
    scrollHandler,
    onLayout,
  };
};

export default useHeaderAnimation;