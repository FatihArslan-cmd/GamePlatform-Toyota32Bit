import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
} from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import Header from './components/Header/Header';
import RoomsScreen from './pages/RoomsScreen/RoomsScreen';
import Buttons from './components/Buttons/Buttons';
import ExplorerScreen from './pages/ExplorerScreen/ExplorerScreen';
import useCommunityScreenAnimations from './hooks/useCommunityScreenAnimations';
import MakePost from './components/Buttons/MakePost';
import { useTheme } from '../../context/ThemeContext';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

const CommunityScreen = () => {
  const pagerRef = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { colors } = useTheme();
  const styles = createStyles(colors); 

  const {
    scrollY,
    scrollHandler,
    headerAnimatedStyle,
    buttonsAnimatedStyle,
    onHeaderLayout,
    onButtonsLayout,
  } = useCommunityScreenAnimations();

  const goToPage = (pageIndex) => {
    pagerRef.current?.setPage(pageIndex);
    setCurrentPageIndex(pageIndex);
  };

  const onPageSelected = (e) => {
    setCurrentPageIndex(e.nativeEvent.position);
    if (e.nativeEvent.position === 1) {
      scrollY.value = 0;
    }
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}> 
    <MakePost />
      <Animated.View
        style={[styles.appBar, headerAnimatedStyle, { backgroundColor: colors.background }]} 
        onLayout={onHeaderLayout}
      >
        <Header />
      </Animated.View>
      <Animated.View
        style={[styles.buttonsBar, buttonsAnimatedStyle, { backgroundColor: colors.background }]} 
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
        onPageSelected={onPageSelected}
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

const createStyles = (colors) => StyleSheet.create({ 
  safeArea: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    elevation: 4,
  },
  buttonsBar: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1,
     elevation: 2,
  },
  pagerView: {
    flex: 1,
    marginTop: 80,
  },
});

export default CommunityScreen;