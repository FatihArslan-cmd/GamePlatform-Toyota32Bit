import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const ExploredContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Animated.Image
          sharedTransitionTag="sharedImage"
          style={styles.heroImage}
          source={require('../../../locales/gameImages/unnamed.png')}
        />
        <View style={styles.overlay} />
        <Text style={styles.heroText}>Welcome to the Experience</Text>
      </View>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.contentText}>
              Here's your new exciting content! The image smoothly transitioned to this new position.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroContainer: {
    height: SCREEN_HEIGHT * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  contentText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
});

export default ExploredContent;