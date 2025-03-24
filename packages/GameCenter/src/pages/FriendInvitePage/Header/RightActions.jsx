import React from 'react';
import { View } from 'react-native';
import { IconButton, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext'; // Import useTheme

const RightActions = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); 

  return (
    <View >
        <Tooltip title="Search">
      <IconButton
        icon="magnify"
        size={28}
        iconColor={colors.text} 
        onPress={() => {
          navigation.navigate('SearchScreen');
        }}
      />
        </Tooltip>
    </View>
  );
};

export default RightActions;