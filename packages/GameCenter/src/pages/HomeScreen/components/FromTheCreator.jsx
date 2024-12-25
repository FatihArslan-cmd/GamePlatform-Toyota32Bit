import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Divider, Button } from 'react-native-paper';

const FromTheCreator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>From the Creator</Text>
      <Divider style={styles.divider} />
      <Card style={styles.card}>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.image}
          source={require('../../../locales/gameImages/unnamed.png')} // Adjust asset path
        >
          <View style={styles.overlay} />
        </ImageBackground>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.description}>
            Welcome to this amazing application! Explore and enjoy your experience.
          </Text>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => console.log('Explore button pressed!')}
          >
            Explore Now
          </Button>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#6200ee',
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
  image: {
    resizeMode: 'cover',
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
  button: {
    borderRadius: 24,
    backgroundColor: '#6200ee',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FromTheCreator;
