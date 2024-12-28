import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,  } from 'react-native';
import { Card, Text, Divider, Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-linear-gradient';
import MyLoader from '../../../components/SkeletonPlaceHolder/MiniGamesPlaceHolder';
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

  useEffect(() => {
    // Simulating data loading delay
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
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
      )}
    </View>
  );
});

const BLOCK_WIDTH = 150;
const BLOCK_HEIGHT = 180;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 20,
  },
  divider: {
    height: 3,
    borderRadius: 1,
    width: '100%',
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  rowsContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  surface: {
    borderRadius: 16,
    padding: 2,
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4ECDC4',
  },
});

export default MiniGamesBlock;
