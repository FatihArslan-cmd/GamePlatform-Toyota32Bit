import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';

const GameCard = ({ instructions, imageSource, buttonText, onButtonPress, buttonColors, backgroundColors }) => {
  const navigation = useNavigation();

  const defaultButtonColors = ['#4A00E0', '#FF8C00'];
  const colorsToUse = buttonColors || defaultButtonColors; 

  return (
    <Card style={styles.card}>
      <FastImage
        style={styles.imageBackground}
        source={imageSource}
      >
        <View style={styles.overlay} />
      </FastImage>
      
      <View style={styles.cardContentContainer}>
        {/* Blurred background image */}
        <FastImage
          style={styles.blurredImageBackground}
          source={imageSource}
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        
        <View style={styles.cardContent}>
          <Text style={styles.description}>{instructions}</Text>
          <LinearGradient
            colors={colorsToUse}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Button
              mode="text"
              style={styles.transparentButton}
              labelStyle={styles.buttonText}
              onPress={() => {
                navigation.navigate('GameDetails', {
                  gameName: "Bingo",
                  about: "Bingo is a fun and simple game! Mark the numbers on your card as they are called out. Be the first to complete a row, column, or diagonal and shout 'Bingo!' to win!",
                  imageSource,
                  buttonText,
                  onButtonPress,
                  backgroundColors
                });
              }}
            >
              {buttonText}
            </Button>
          </LinearGradient>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    width: '95%',
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
  cardContentContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  blurredImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  cardContent: {
    padding: 16,
    width: '100%',
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF', 
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Orbitron-VariableFont_wght',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
    fontFamily: 'Orbitron-ExtraBold',
    color: '#FFFFFF',
  },
});

export default GameCard;