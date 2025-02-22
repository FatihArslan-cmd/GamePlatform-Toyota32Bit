import React from 'react';
import {  TouchableOpacity } from 'react-native';
import { IconButton, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // useFocusEffect import edildi

const MessageIcon = ({ navigateTo }) => {
  const navigation = useNavigation();
  

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <Tooltip title="Chat with Friends">

    <TouchableOpacity
      onPress={handlePress}
    >

      <IconButton
        icon="message-outline"
        color="gray"
        size={24}
        style={{ opacity: 0.7 }}
      />
    </TouchableOpacity>
    </Tooltip> 

  );
};



export default MessageIcon;