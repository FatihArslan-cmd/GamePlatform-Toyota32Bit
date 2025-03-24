import React from 'react';
import { View } from 'react-native';
import { IconButton,Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MessageIcon from './MessageIcon';
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme

const RightActions = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); 

  return (
    <View style={{ flexDirection: 'row' }}>
        <MessageIcon navigateTo="ChatWithFriendsScreen"/>
        <Tooltip title="Create Community">
      <IconButton
        icon="plus"
        size={24}
        style={{ opacity: 0.7 }}
        iconColor={colors.text} 
        onPress={() => {
          navigation.navigate('CreateRoom');
        }}
      />
        </Tooltip>

        <Tooltip title="Search">
      <IconButton
        icon="magnify"
        size={24}
        style={{ opacity: 0.7 }}
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