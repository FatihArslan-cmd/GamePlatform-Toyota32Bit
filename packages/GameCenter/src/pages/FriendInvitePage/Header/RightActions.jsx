import React from 'react';
import { View } from 'react-native';
import { IconButton,Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RightActions = () => {
  const navigation = useNavigation();
  return (
    <View >
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