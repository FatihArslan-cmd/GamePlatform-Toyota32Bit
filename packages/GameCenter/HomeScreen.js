import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailScreen', { sharedId: 'image1' })
        }
      >
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 100, height: 100 }}
          sharedTransitionTag="image1" // Shared element ID
        />
      </TouchableOpacity>
    </View>
  );
}
