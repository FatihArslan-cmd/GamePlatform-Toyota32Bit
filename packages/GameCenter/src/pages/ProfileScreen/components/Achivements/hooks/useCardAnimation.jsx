import { useEffect } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';

const useCardAnimation = (index) => {
    const translateYAnim = useSharedValue(50);
    const opacityAnim = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityAnim.value,
            transform: [{ translateY: translateYAnim.value }],
        };
    });

    useEffect(() => {
        translateYAnim.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.ease),
        });
        opacityAnim.value = withTiming(1, {
            duration: 400,
            easing: Easing.out(Easing.ease),
        });
    }, [index]);

    return { animatedStyle };
};

export default useCardAnimation;