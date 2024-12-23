import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getGamesFromStorage } from '../../utils/api';
import { FlashList } from "@shopify/flash-list";
import { useRoute, useNavigation } from '@react-navigation/native';
import ToastMessage from '../../components/ToastMessage/Toast';
import useToast from '../../components/ToastMessage/hooks/useToast';
const HomeScreen = () => {
    const { currentToast, showToast, hideToast } = useToast();
const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const route = useRoute();
  useEffect(() => {
    if (route.params?.toastshow) {
      setTimeout(() => {
        showToast('success', 'Successfully logged in!');
      }, 750);
      navigation.setParams({ toastshow: false });
    }
  }, [route.params?.toastshow]);
  useEffect(() => {
    const storedGames = getGamesFromStorage(); 
    if (storedGames) {
      setGames(storedGames); 
    }
  }, []);

  const renderGame = ({ item }) => (
    <View style={styles.gameItem}>
      <Text>{item.title}</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item, index) => index.toString()} 
        estimatedItemSize={50} // Recommended for performance
      />
       {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the FlashList has space to render
  },
  gameItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
