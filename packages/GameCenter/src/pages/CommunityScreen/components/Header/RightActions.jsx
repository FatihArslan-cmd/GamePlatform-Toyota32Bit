import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RightActions = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <IconButton
        icon="plus"
        size={28}
        onPress={() => {
          navigation.navigate('CreateRoom');
        }}
      />
      <IconButton
        icon="magnify"
        size={28}
        onPress={() => {
          navigation.navigate('SearchScreen');
        }}
      />
    </View>
  );
};

export default RightActions;