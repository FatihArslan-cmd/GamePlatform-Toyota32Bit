import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

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

  const onLayout = (event) => {
    appBarHeight.value = event.nativeEvent.layout.height;
  };

  return {
    appBarHeight,
    scrollY,
    isScrolling,
    scrollHandler,
    onLayout,
  };
};

export default useHeaderAnimation;