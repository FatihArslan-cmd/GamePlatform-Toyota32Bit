import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getGamesFromStorage } from '../../utils/api';

const HomeScreen = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedGames = getGamesFromStorage(); 
    if (storedGames) {
      setGames(storedGames); 
    }
  }, []);

  const renderGame = ({ item }) => (
    <View>
      <Text>{item.title}</Text> 
    </View>
  );

  return (
    <View>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
};

export default HomeScreen;
