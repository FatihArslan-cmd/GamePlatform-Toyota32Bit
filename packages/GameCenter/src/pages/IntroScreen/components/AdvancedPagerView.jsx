import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import PageItem from './PageItem';
import pages from './pages';
import { useNavigation } from '@react-navigation/native';

const AdvancedPagerView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.9,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(translateAnim, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
        transitionStyle="scroll"
      >
        {pages.map((page, index) => (
          <PageItem
            key={index}
            page={page}
            scaleAnim={scaleAnim}
            translateAnim={translateAnim}
            navigation={navigation} // Burada navigation'ı geçiriyoruz
           />
        ))}
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
