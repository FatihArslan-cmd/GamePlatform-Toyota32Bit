import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

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

const styles = StyleSheet.create({
  surface: {
    borderRadius: 16,
    padding: 8,
  },
  card: {
    width: 150,
    height: 180,
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
});

export default GameItem;
