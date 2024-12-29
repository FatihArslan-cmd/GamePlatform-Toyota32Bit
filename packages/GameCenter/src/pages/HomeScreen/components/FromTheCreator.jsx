import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import gameData from './GameDetails/gameData.json';
import imageAssets from './GameDetails/imageAssets';

const FromTheCreator = () => {
  const navigation = useNavigation();

  const getImageSource = (imageName) => {
    return imageAssets[imageName] || null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>From the Creator</Text>
      <LinearGradient
        colors={['#4A00E0', '#FF8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      />
      <Card style={styles.card}>
        <FastImage
          style={styles.imageBackground}
          source={getImageSource(gameData.imageSource)} // Use dynamic mapping
        >
          <View style={styles.overlay} />
        </FastImage>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.description}>
            Welcome to this amazing application! Explore and enjoy your experience.
          </Text>
          <LinearGradient
            colors={['#4A00E0', '#FF8C00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Button
              mode="text"
              style={styles.transparentButton}
              labelStyle={styles.buttonText}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: gameData.title,
                  instructions: gameData.instructions,
                  imageSource: getImageSource(gameData.imageSource),
                  buttonText: gameData.buttonText,
                  onButtonPress: () => console.log(gameData.onButtonPress),
                })
              }
            >
              Explore Now
            </Button>
          </LinearGradient>
        </Card.Content>
      </Card>
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
  divider: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: '20%',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 220,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  gradientButton: {
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  transparentButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FromTheCreator;
