import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RightActions = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      icon="magnify"
      size={28}
      onPress={() => {
        // Handle search navigation here (replace 'SearchScreen' with your actual screen name)
        navigation.navigate('SearchScreen');
      }}
    />
  );
};

export default RightActions;