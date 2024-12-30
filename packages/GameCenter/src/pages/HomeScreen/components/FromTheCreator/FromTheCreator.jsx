import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientDivider from '../../../../components/GradientDivider';
import GameCard from './GameCard';
import gameData from '../GameDetails/gameData.json';
import imageAssets from '../GameDetails/imageAssets';

const FromTheCreator = () => {
  const getImageSource = (imageName) => {
    return imageAssets[imageName] || null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>From the Creator</Text>
      <GradientDivider />
      <GameCard
        title={gameData.title}
        instructions="Welcome to this amazing application! Explore and enjoy your experience."
        imageSource={getImageSource(gameData.imageSource)}
        buttonText="Explore Now"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default FromTheCreator;
