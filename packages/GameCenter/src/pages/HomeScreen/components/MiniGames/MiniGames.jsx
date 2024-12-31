import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import GameItem from './GameItem';
import ScrollArrow from './ScrollArrow';
import MyLoader from '../../../../components/SkeletonPlaceHolder/MiniGamesPlaceHolder'; // Orijinal Placeholder
import { cardColors } from './CardColors';
const MiniGamesBlock = memo(({ games }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500); // Yükleme simülasyonu
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
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

  const tags = games.flatMap((game) => game.tags?.slice(0, 44) || []);
  const displayedTags = tags.slice(0, 20);

  const topRow = displayedTags.filter((_, i) => i % 2 === 0);
  const bottomRow = displayedTags.filter((_, i) => i % 2 === 1);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Mini Games</Text>
      <Divider style={styles.divider} />
      {isLoading ? (
        <MyLoader />
      ) : (
        <View style={styles.scrollWrapper}>
          {canScrollLeft && <ScrollArrow direction="left" onPress={() => scroll('left')} />}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View style={styles.rowsContainer}>
              <View style={styles.row}>
                {topRow.map((item, index) => (
                  <GameItem key={index} item={item} color={cardColors[index % cardColors.length]} />
                ))}
              </View>
              <View style={styles.row}>
                {bottomRow.map((item, index) => (
                  <GameItem
                    key={index + topRow.length}
                    item={item}
                    color={cardColors[(index + topRow.length) % cardColors.length]}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          {canScrollRight && <ScrollArrow direction="right" onPress={() => scroll('right')} />}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 28,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  divider: {
    height: 3,
    borderRadius: 1,
    width: '100%',
    marginVertical: 10,
  },
  scrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  rowsContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
  },
});

export default MiniGamesBlock;
