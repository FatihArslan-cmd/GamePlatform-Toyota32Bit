import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import Header from './components/Header/Header';
import RoomsScreen from './pages/RoomsScreen/RoomsScreen';
import Buttons from './components/Buttons/Buttons';
import ExplorerScreen from './pages/ExplorerScreen/ExplorerScreen';
import { useHeaderAnimatedStyle, useButtonsAnimatedStyle } from './components/Animations/HeaderAnimation'; // Import animation styles
import MakePost from './components/Buttons/MakePost';
import BackButton from './components/Buttons/UpIcon';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const CommunityScreen = () => {
  const pagerRef = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

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

  const goToPage = (pageIndex) => {
    pagerRef.current?.setPage(pageIndex);
    setCurrentPageIndex(pageIndex);
  };

  const onPageSelected = (e) => {
    setCurrentPageIndex(e.nativeEvent.position);
    if (e.nativeEvent.position === 1) { // Explorer ekranına geçildiğinde
      scrollY.value = 0; // scrollY değerini sıfırla
    }
  };

  return (
    <View style={styles.safeArea}>
    <MakePost />

      <Animated.View
        style={[styles.appBar, headerAnimatedStyle]}
        onLayout={onHeaderLayout}
      >
        <Header />
      </Animated.View>
      <Animated.View
        style={[styles.buttonsBar, buttonsAnimatedStyle]}
        onLayout={onButtonsLayout}
      >
      <Buttons
        goToHome={() => goToPage(0)}
        goToExplorer={() => goToPage(1)}
        currentPageIndex={currentPageIndex}
      />
      </Animated.View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={true}
        onPageSelected={onPageSelected} // onPageSelected olayını ekleyin
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
    zIndex: 2,
    backgroundColor: 'white',
    elevation: 4,
  },
  buttonsBar: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
     elevation: 2,
  },
  pagerView: {
    flex: 1,
    marginTop: 80,
  },
});

export default CommunityScreen;