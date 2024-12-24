import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { getGamesFromStorage } from '../../../utils/api'; // Doğru path olduğundan emin olun

const FeaturedGames = ({games}) => {

  
  return (
    <View style={styles.center}>
      {games.length > 0 ? (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.background_image }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No games available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 444,
    borderRadius: 55,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FeaturedGames;
