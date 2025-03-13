import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const useProfileSectionAnimation = (isEditMode) => {
    const scale = useSharedValue(0);
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (isEditMode) {
            scale.value = withTiming(1, {
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
            rotation.value = withTiming(1, {
                duration: 700,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        } else {
            scale.value = withTiming(0, {
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
            rotation.value = withTiming(0, {
                duration: 700,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        }
    }, [isEditMode, scale, rotation]);

    const animatedCameraIconContainerStyle = useAnimatedStyle(() => {
        const interpolatedRotation = rotation.value * 360;
        const animatedScale = scale.value;

        return {
            transform: [
                { scale: animatedScale },
                { rotate: `${interpolatedRotation}deg` },
            ],
            opacity: scale.value,
        };
    });

    return { animatedCameraIconContainerStyle };
};

export default useProfileSectionAnimation;