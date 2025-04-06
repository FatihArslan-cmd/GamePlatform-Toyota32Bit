import PageItem from "./PageItem";
import PagerView from "react-native-pager-view";
import React, { useCallback, useEffect, useRef, useState } from "react";
import pages from "./pages";
import { useNavigation } from "@react-navigation/native";
import { Animated, Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { setNavigationBar } from "../../../utils/NavBarManager";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet(); // Determine device type once

const AdvancedPagerView = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
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
      <View key={index} style={styles.pageWrapper}>
          <PageItem
            page={page}
            scaleAnim={animValues[index].scaleAnim}
            translateAnim={animValues[index].translateAnim}
            navigation={navigation}
          />
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e'
  },
  pagerView: {
    flex: 1,
    width: '100%'
  },
   pageWrapper: { // Added wrapper to ensure each page takes full dimensions
    width: Dimensions.get('window').width,
    height: '100%', // Ensure full height within PagerView
   },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: TABLET_DEVICE ? 40 : 30, // Conditional bottom position
    width: '100%',
    paddingBottom: TABLET_DEVICE ? 0 : 10, // Add some padding on phones if navbar overlaps
  },
  indicator: {
    width: TABLET_DEVICE ? 10 : 8, // Conditional width
    height: TABLET_DEVICE ? 10 : 8, // Conditional height
    borderRadius: TABLET_DEVICE ? 5 : 4, // Conditional border radius
    backgroundColor: '#ffffff30',
    marginHorizontal: TABLET_DEVICE ? 5 : 4, // Conditional margin
  },
  activeIndicator: {
    backgroundColor: '#8a2be2',
    shadowColor: '#8a2be2',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    // Optionally make active indicator slightly larger
    // width: TABLET_DEVICE ? 12 : 10,
    // height: TABLET_DEVICE ? 12 : 10,
    // borderRadius: TABLET_DEVICE ? 6 : 5,
  },
});

export default AdvancedPagerView;