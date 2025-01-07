import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const GameCard = ({ title, instructions, imageSource, buttonText, onButtonPress }) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <FastImage
        style={styles.imageBackground}
        source={imageSource}
      >
        <View style={styles.overlay} />
      </FastImage>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.description}>{instructions}</Text>
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
            onPress={() => {
              navigation.navigate('GameDetails', {
                title,
                about:"Bingo is a fun and simple game! Mark the numbers on your card as they are called out. Be the first to complete a row, column, or diagonal and shout 'Bingo!' to win!",
                imageSource,
                buttonText,
                onButtonPress,
              });
            }}
          >
            {buttonText}
          </Button>
        </LinearGradient>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'Orbitron-VariableFont_wght',
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

export default GameCard;
