import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-paper';
export default function CustomHeader({ onSearchPress }) {
  return {
    headerLeft: () => (
      <Icon
        name="search"
        size={22}
        color="#5f6368"
        style={{ marginLeft: 16 }}
        onPress={onSearchPress}
      />
    ),
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="game-controller" size={24} color="#000" />
        <Text style={{ fontSize: 18, marginLeft: 8,fontFamily:'Anton-Regular' }}>GameCenter</Text>
      </View>
    ),
    headerRight: () => (
      <Icon
        name="ellipsis-vertical"
        size={22}
        color="#5f6368"
        style={{ marginRight: 16 }}
      />
    ),
    headerTitleAlign: 'center',
  };
}
