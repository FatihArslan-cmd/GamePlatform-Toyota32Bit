import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Divider, Surface,TouchableRipple } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-linear-gradient';
import MyLoader from '../../../components/SkeletonPlaceHolder/MiniGamesPlaceHolder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isTablet } from '../../../components/isTablet';

const cardColors = [
  '#FF6B6B', '#4ECDC4', '#96C93D', '#5F2C82', '#667EEA',
  '#00B4DB', '#FF512F', '#4776E6', '#00B09B', '#FDC830'
];

const GameItem = memo(({ item, color }) => (
  <Surface style={[styles.surface, { backgroundColor: color }]} elevation={4}>
    <Card style={styles.card}>
      <FastImage
        source={{ uri: item.image_background }}
        style={styles.cardCover}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <Card.Title
        title={item.name}
        titleStyle={styles.cardTitle}
        titleNumberOfLines={2}
      />
    </Card>
  </Surface>
));

const MiniGamesBlock = memo(({ games }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isAtStart = contentOffset.x <= 0;
    const isAtEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;
    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  const scroll = (direction) => {
    if (scrollViewRef.current) {
      if (direction === 'left') {
        scrollViewRef.current.scrollTo({
          x: 0, 
          animated: true,
        });
      } else {
        scrollViewRef.current.scrollToEnd({
          animated: true, 
        });
      }
    }
  };
  

  const tags = games.flatMap(game => game.tags?.slice(0, 44) || []);
  const displayedTags = tags.slice(0, 20);

  const topRow = displayedTags.filter((_, i) => i % 2 === 0);
  const bottomRow = displayedTags.filter((_, i) => i % 2 === 1);

  const renderGameItem = (item, index) => (
    <GameItem
      key={index}
      item={item}
      color={cardColors[index % cardColors.length]}
    />
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Mini Games</Text>
      <Divider style={styles.divider} />
      {isLoading ? (
        <MyLoader />
      ) : (
        <View style={styles.scrollWrapper}>
          {canScrollLeft && (
           <TouchableRipple
           style={styles.arrowLeft}
           onPress={() => scroll('left')}
         >
           <Icon name="chevron-left" size={48}  style={{ opacity: 0.6 }} />
         </TouchableRipple>
          )}
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
                {topRow.map((item, index) => renderGameItem(item, index))}
              </View>
              <View style={styles.row}>
                {bottomRow.map((item, index) =>
                  renderGameItem(item, index + topRow.length)
                )}
              </View>
            </View>
          </ScrollView>
          {canScrollRight && (
            <TouchableRipple
            style={styles.arrowRight}
            onPress={() => scroll('right')}
          >
            <Icon name="chevron-right" size={48}  style={{ opacity: 0.6 }} />
          </TouchableRipple>
          )}
        </View>
      )}
    </View>
  );
});

const BLOCK_WIDTH = isTablet ? 150 * 1.15 : 150; 
const BLOCK_HEIGHT = isTablet ? 180 * 1.15 : 180;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f8f9fa',
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
  surface: {
    borderRadius: 16,
    padding: 8,
  },
  card: {
    width: BLOCK_WIDTH,
    height: BLOCK_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardCover: {
    height: '100%',
    borderRadius: 12,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    padding: 8,

  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    padding: 8,
  },
});

export default MiniGamesBlock;
