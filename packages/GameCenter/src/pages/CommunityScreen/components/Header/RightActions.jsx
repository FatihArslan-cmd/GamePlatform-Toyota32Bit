import React from 'react';
import { View } from 'react-native';
import { IconButton,Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RightActions = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
        <Tooltip title="Create Community">
      <IconButton
        icon="plus"
        size={28}
        onPress={() => {
          navigation.navigate('CreateRoom');
        }}
      />
        </Tooltip>
        <Tooltip title="Search">
      <IconButton
        icon="magnify"
        size={28}
        onPress={() => {
          navigation.navigate('SearchScreen');
        }}
      />
        </Tooltip>
    </View>
  );
};

export default RightActions;