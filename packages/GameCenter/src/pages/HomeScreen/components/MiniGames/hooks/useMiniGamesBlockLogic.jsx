import { useRef, useState, useEffect, Animated } from 'react';

const useMiniGamesBlockLogic = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollViewRef = useRef(null);
    const scrollProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const progress = contentOffset.x / (contentSize.width - layoutMeasurement.width);
        scrollProgress.setValue(progress);

        setCanScrollLeft(contentOffset.x > 0);
        setCanScrollRight(contentOffset.x + layoutMeasurement.width < contentSize.width);
    };

    const scroll = (direction) => {
        if (scrollViewRef.current) {
            if (direction === 'left') {
                scrollViewRef.current.scrollTo({ x: 0, animated: true });
            } else {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        }
    };

    return {
        isLoading,
        setIsLoading,
        canScrollLeft,
        setCanScrollLeft,
        canScrollRight,
        setCanScrollRight,
        scrollViewRef,
        scrollProgress,
        handleScroll,
        scroll,
    };
};

export default useMiniGamesBlockLogic;