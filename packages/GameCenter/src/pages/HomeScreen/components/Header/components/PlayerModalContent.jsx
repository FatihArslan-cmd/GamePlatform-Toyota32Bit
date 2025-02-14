import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {  Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

const PlayerModalContent = ({ lobby }) => {
  const renderPlayerItem = ({ item }) => (
    <View style={styles.playerItemContainer}>
      <FastImage
        style={styles.profileImage}
        source={{
          uri: item.profilePhoto,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.playerText}>{item.username}</Text>
    </View>
  );


  return (
    <View>
      <FlatList
        data={lobby.members}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display players in two columns
        contentContainerStyle={styles.playerListContainer}
      />
   
    </View>
  );
};

const styles = StyleSheet.create({
  playerListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  playerItemContainer: {
    flex: 1, // Equal spacing between items in columns
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5, // Spacing between columns
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  playerText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
  },
  noPlayersText: {
    fontSize: 16,
    color: '#d3d3d3',
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginVertical: 20,
  },
  startGameButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  startGameButtonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
});

export default PlayerModalContent;