import React, { useRef, useState } from 'react'; // useState'i ekle
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import Header from './components/Header/Header';
import useHeaderAnimation from '../HomeScreen/hooks/useHeaderAnimation';
import RoomsScreen from './pages/RoomsScreen';
import Buttons from './components/Buttons/Buttons';
import ExplorerScreen from './pages/ExplorerScreen'; // ExplorerScreen'i import et

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const CommunityScreen = () => {
  const pagerRef = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State olarak tanımla

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

  const goToPage = (pageIndex) => {
    pagerRef.current?.setPage(pageIndex);
    setCurrentPageIndex(pageIndex); // State'i güncelle
  };

  return (
    <View style={styles.safeArea}>
      <Animated.View
        style={[styles.appBar, headerAnimatedStyle]}
        onLayout={onLayout}
      >
        <Header />
      </Animated.View>

      <Buttons
        goToHome={() => goToPage(0)}
        goToExplorer={() => goToPage(1)}
        currentPageIndex={currentPageIndex} // Aktif sayfa bilgisini gönder
      />

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={true}
        onPageSelected={(e) => setCurrentPageIndex(e.nativeEvent.position)} // Sayfa değiştiğinde state'i güncelle
      >
        <View key="0">
          <AnimatedScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={8}
            overScrollMode="never"
            bounces={false}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={true}
          >
            <RoomsScreen />
          </AnimatedScrollView>
        </View>
        <View key="1">
          <ExplorerScreen />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
  pagerView: {
    flex: 1,
  },
});

export default CommunityScreen;