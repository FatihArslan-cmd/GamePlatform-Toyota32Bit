// Header/RightActions.js
import React from 'react';
import { View } from 'react-native';
import { IconButton,Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme

const RightActions = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  return (
    <View style={{ flexDirection: 'row' }}>

        <Tooltip title="Search">
      <IconButton
        icon="magnify"
        size={28}
        onPress={() => {
          navigation.navigate('SearchScreen');
        }}
        iconColor={colors.text}
      />
        </Tooltip>
    </View>
  );
};

export default RightActions;