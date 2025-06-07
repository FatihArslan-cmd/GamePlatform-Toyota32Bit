import { interpolate, useAnimatedStyle } from "react-native-reanimated";

const useHeaderScrollAnimation = (scrollY, appBarHeight, config = {}) => {
  const { scrollDistance = 100, inputRangeStart = 0 } = config;
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [inputRangeStart, inputRangeStart + scrollDistance];
    const outputRange = [appBarHeight.value, 0];

    const translateY = interpolate(
      scrollY.value,
      inputRange,
      outputRange,
    );

    return {
      transform: [{ translateY }],
    };
  });

  return headerAnimatedStyle;
};

export default useHeaderScrollAnimation;