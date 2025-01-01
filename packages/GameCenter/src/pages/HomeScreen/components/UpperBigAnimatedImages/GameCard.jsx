import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import formatDate from '../../../../utils/FormatDate';
const GameCard = ({ game }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.page}>
      <View style={styles.cardContainer}>
        <FastImage
          source={{ uri: game.background_image,
            priority: FastImage.priority.high,
           }}
          style={styles.image}
          
          onLoad={() => setImageLoaded(true)}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.gradient}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.gameTitle}>{game.name}</Text>
            <Text style={styles.releaseInfo}>Released: {game.released}</Text>
            <Text style={styles.releaseInfo}>Last Updated: {formatDate(game.updated)}</Text>
            {game.genres && (
              <View style={styles.genreContainer}>
                {game.genres.slice(0, 3).map(genre => (
                  <Chip 
                    key={genre.id}
                    style={styles.genreChip} 
                    textStyle={styles.genreChipText}
                  >
                    {genre.name}
                  </Chip>
                ))}
              </View>
            )}
            <View style={styles.statsContainer}>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                <MaterialIcons name="star" size={16} color="#FFD700" /> {game.rating}
              </Chip>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                <MaterialIcons name="people" size={16} color="#fff" /> {game.ratings_count} ratings
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
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginVertical:10
  },
  genreChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  genreChipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',

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
    height: '50%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoContainer: {
    padding: 20,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'Orbitron-VariableFont_wght',

  },
  releaseInfo: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Orbitron-VariableFont_wght',

  },

  statsContainer: {
    flexDirection: 'row',
    gap: 11,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  chipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',

  },
});

export default GameCard;
