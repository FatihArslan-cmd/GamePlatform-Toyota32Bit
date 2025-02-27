// GameDetailsImageEnterAnimation.js
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export const GameDetailsImageEnterAnimation = () => { // Corrected: Exporting as named export
  const translateY = useSharedValue(height - 275);
  const scale = useSharedValue(1);
  const contentTranslateY = useSharedValue(100);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Animations
    translateY.value = withTiming(-height / 2 + 250, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withSequence(
      withTiming(2.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      withTiming(2, { duration: 300, easing: Easing.bounce })
    );

    contentTranslateY.value = withDelay(
      800,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
    );

    contentOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 600, easing: Easing.bezier(0.4, 0, 0.2, 1) })
    );
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }));

  return { animatedImageStyle, animatedContentStyle };
};