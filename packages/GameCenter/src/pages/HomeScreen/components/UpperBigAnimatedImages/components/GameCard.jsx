import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useCallback, useState } from "react";
import formatDate from "../../../../../utils/FormatDate";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Chip, Text } from "react-native-paper";
import { isTablet } from "../../../../../utils/isTablet";

const { height } = Dimensions.get('window'); 
const TABLET_DEVICE = isTablet();

const GameCard = ({ game }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslation();
  const handleLayout = useCallback(
    (event) => {
      const { y } = event.nativeEvent.layout; 
      const isCardVisible = y >= 0 && y <= height; 
      setIsVisible(isCardVisible);
    },
    [height]
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <View style={styles.page} onLayout={handleLayout}>
      {isVisible && ( 
        <View style={styles.cardContainer}>
          <FastImage
            source={{
              uri: game.background_image,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
                        }}
            style={styles.image}
            onLoad={handleImageLoad}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.gradient}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.gameTitle}>{game.name}</Text>
              <Text style={styles.releaseInfo}>{t('homeScreen.released')} {game.released}</Text>
              <Text style={styles.releaseInfo}>{t('homeScreen.lastUpdated')} {formatDate(game.updated)}</Text>
              {game.genres && (
                <View style={styles.genreContainer}>
                  {game.genres.slice(0, 3).map((genre) => (
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
                  <MaterialIcons name="star" size={TABLET_DEVICE ? 16 : 12} color="#FFD700" /> {game.rating}
                </Chip>
                <Chip style={styles.chip} textStyle={styles.chipText}>
                  <MaterialIcons name="people" size={TABLET_DEVICE ? 16 : 12} color="#fff" /> {game.ratings_count} ratings
                </Chip>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: TABLET_DEVICE ? 20 : 10,
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
    marginVertical: 10,
  },
  genreChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  genreChipText: {
    color: '#fff',
    fontSize: TABLET_DEVICE ? 16 : 12,
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
    padding: TABLET_DEVICE ? 20 : 10,
  },
  gameTitle: {
    color: '#fff',
    fontSize: TABLET_DEVICE ? 36 : 19,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'Orbitron-ExtraBold'
  },
  releaseInfo: {
    color: '#ccc',
    fontSize: TABLET_DEVICE ? 16 : 12,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: TABLET_DEVICE ? 11 : 5,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  chipText: {
    color: '#fff',
    fontSize: TABLET_DEVICE ? 16 : 10,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default GameCard;
