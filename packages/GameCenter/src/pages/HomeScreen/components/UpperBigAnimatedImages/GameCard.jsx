import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';

const GameCard = ({ game }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.page}>
      <View style={styles.cardContainer}>
        <FastImage
          source={{ uri: game.background_image }}
          style={styles.image}
          onLoad={() => setImageLoaded(true)}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.gradient}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.gameTitle}>{game.name}</Text>
            <View style={styles.statsContainer}>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                ★ {game.rating}
              </Chip>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                {game.ratings_count} ratings
              </Chip>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoContainer: {
    padding: 20,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default GameCard;
