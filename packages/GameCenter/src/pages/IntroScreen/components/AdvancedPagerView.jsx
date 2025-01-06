import React, { useState, useRef, useCallback,useEffect } from 'react';
import { StyleSheet, View, Animated,StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view';
import PageItem from './PageItem';
import pages from './pages';
import { useNavigation } from '@react-navigation/native';
import { setNavigationBar } from '../../../utils/NavBarManager';

const AdvancedPagerView = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Set navigation bar color to blue with light icons
    setNavigationBar('#1a1b2e', true);
  }, []);

  const animValues = useRef(
    pages.map(() => ({
      scaleAnim: new Animated.Value(1),
      translateAnim: new Animated.Value(0),
    }))
  ).current;
  const navigation = useNavigation();

  const handlePageChange = (event) => {
    const newPage = event.nativeEvent.position;
    setCurrentPage(newPage);

    Animated.sequence([
      Animated.timing(animValues[newPage].scaleAnim, {
        toValue: 1.9,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(animValues[newPage].scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(animValues[newPage].translateAnim, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderPage = useCallback(
    (page, index) => (
      <PageItem
        key={index}
        page={page}
        scaleAnim={animValues[index].scaleAnim}
        translateAnim={animValues[index].translateAnim}
        navigation={navigation}
      />
    ),
    [navigation, animValues]
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
        transitionStyle="scroll"
      >
        {pages.map(renderPage)}
      </PagerView>
      <View style={styles.indicatorContainer}>
        {pages.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              currentPage === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1b2e' },
  pagerView: { flex: 1, width: '100%' },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff30',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#8a2be2',
    shadowColor: '#8a2be2',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default AdvancedPagerView;
