import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useHeaderAnimatedStyle, useButtonsAnimatedStyle } from '../components/Animations/HeaderAnimation';

const useCommunityScreenAnimations = () => {
  const appBarHeight = useSharedValue(0);
  const buttonsBarHeight = useSharedValue(0);
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

  const headerAnimatedStyle = useHeaderAnimatedStyle(scrollY, appBarHeight);
  const buttonsAnimatedStyle = useButtonsAnimatedStyle(scrollY, buttonsBarHeight);

  const onHeaderLayout = (event) => {
    appBarHeight.value = event.nativeEvent.layout.height;
  };
  const onButtonsLayout = (event) => {
    buttonsBarHeight.value = event.nativeEvent.layout.height;
  };

  return {
    appBarHeight,
    buttonsBarHeight,
    scrollY,
    isScrolling,
    scrollHandler,
    headerAnimatedStyle,
    buttonsAnimatedStyle,
    onHeaderLayout,
    onButtonsLayout,
  };
};

export default useCommunityScreenAnimations;