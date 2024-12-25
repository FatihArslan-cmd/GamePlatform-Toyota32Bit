import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

const MiniGamesBlock = ({ games }) => {
  // Flatten the array of tags from the games data
  const tags = games.flatMap(game => game.tags?.slice(0, 20) || []);

  // Extract only the first 20 tags
  const displayedTags = tags.slice(0, 33);

  return (
    <>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign:'center' }}>Mini Games</Text>
    <ScrollView horizontal style={styles.container}>
      {displayedTags.map((tag, index) => (
        <View key={index} style={styles.block}>
          <FastImage
            source={{ uri: tag.image_background }}
            style={styles.image}
          />
          <Text style={styles.gameName} numberOfLines={1}>
            {tag.name}
          </Text>
        </View>
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  block: {
    width: 120, // Adjust size of each block
    marginHorizontal: 8,
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4, // Add shadow for modern UI
  },
  image: {
    width: '100%',
    height: 100, // Adjust height for larger blocks
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gameName: {
    marginTop: 8,
    paddingHorizontal: 4,
    fontSize: 14, // Modern font size
    fontWeight: '500', // Bold font for better emphasis
    textAlign: 'center',
    color: '#333',
  },
});

export default MiniGamesBlock;