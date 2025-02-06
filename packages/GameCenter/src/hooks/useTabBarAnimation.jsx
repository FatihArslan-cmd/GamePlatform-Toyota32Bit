import { useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';

const useTabBarAnimation = () => {
  const tabBarVisibility = useSharedValue(0); // 0: visible, 1: hidden
  const lastScrollY = useRef(0);

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      tabBarVisibility.value = 1; // Hide TabBar
    } else if (currentScrollY < lastScrollY.current) {
      tabBarVisibility.value = 0; // Show TabBar
    }

    lastScrollY.current = currentScrollY;
  };

  return { tabBarVisibility, handleScroll };
};

export default useTabBarAnimation;