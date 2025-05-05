import { useEffect } from "react";
import { Dimensions } from "react-native";
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";
import { isTablet } from "../../../../utils/isTablet";

const { height } = Dimensions.get('window');
const TABLET_DEVICE = isTablet(); 

export const GameDetailsImageEnterAnimation = () => {
  const initialTranslateY = height - 275; 
  const translateY = useSharedValue(initialTranslateY);
  const scale = useSharedValue(1);
  const contentTranslateY = useSharedValue(100); 
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    const targetOffsetY = TABLET_DEVICE ? 250 : 135;
    const targetTranslateY = -height / 2 + targetOffsetY;

    translateY.value = withTiming(targetTranslateY, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), 
    });

    scale.value = withSequence(
      withTiming(2.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }), 
      withTiming(2, { duration: 300, easing: Easing.bounce }) 
    );

    contentTranslateY.value = withDelay(
      800, 
      withTiming(0, { 
        duration: 600,
        easing: Easing.out(Easing.quad) 
      })
    );

    contentOpacity.value = withDelay(
      800,
      withTiming(1, { 
        duration: 600,
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
       })
    );
  }, []); 

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }));

  return { animatedImageStyle, animatedContentStyle };
};