import React, { useEffect, memo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import games from './games';
import VideoPlayItems from './VideoPlayItems';
import { useIsFocused } from '@react-navigation/native';
import GradientDivider from '../../../../components/GradientDivider';
const VideoPlayBlock = memo(() => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      FastImage.preload(games.map((game) => ({ uri: game.imageUri })));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games</Text>
      <GradientDivider/>
      <View style={{marginVertical:10}}/>
      <View style={styles.gridContainer}>
        {games.map((game, index) => (
          <VideoPlayItems
            key={game.title}
            title={game.title}
            imageUri={isFocused ? game.imageUri : null} // Eğer görünür değilse FastImage kaldırılır
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
    backgroundColor: '#ffffff',
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
