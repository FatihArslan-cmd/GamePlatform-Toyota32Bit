import React from 'react';
import { StyleSheet, } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Header from './components/Header/Header';
import useHeaderAnimation from '../HomeScreen/hooks/useHeaderAnimation';
import RoomsScreen from './pages/RoomsScreen';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const CommunityScreen = () => {

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
  const headerAnimatedStyle = useHeaderAnimation(scrollY, appBarHeight);
  const onLayout = (event) => {
    appBarHeight.value = event.nativeEvent.layout.height;
  };
  return (
    <SafeAreaView style={styles.safeArea}>
   <Animated.View
        style={[styles.appBar, headerAnimatedStyle]}
        onLayout={onLayout}
      >
        <Header />
      </Animated.View>  
      
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={8}
        overScrollMode="never"
        bounces={false}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      >
          <RoomsScreen />
          </AnimatedScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Optional: Background color
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default CommunityScreen;