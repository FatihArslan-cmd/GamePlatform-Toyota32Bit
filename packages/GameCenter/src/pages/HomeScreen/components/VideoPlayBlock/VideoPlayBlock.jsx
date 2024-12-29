import React, { useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import games from './games';
import VideoPlayItems from './VideoPlayItems';

const { width } = Dimensions.get('window');
const CARD_SPACING = 10;
const CARD_WIDTH = (width - CARD_SPACING * 3) / 2.1;

const VideoPlayBlock = memo(() => {

  useEffect(() => {
    FastImage.preload(games.map(game => ({ uri: game.imageUri })));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games</Text>
            <LinearGradient
              colors={['#4A00E0', '#FF8C00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.divider}
            />
      <View style={styles.gridContainer}>
        {games.map((game, index) => (
          <VideoPlayItems 
            key={game.title} 
            title={game.title} 
            imageUri={game.imageUri} 
            index={index}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  divider: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: '20%',
    marginBottom: 35,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginBottom: 16,
  },
});
export default VideoPlayBlock;