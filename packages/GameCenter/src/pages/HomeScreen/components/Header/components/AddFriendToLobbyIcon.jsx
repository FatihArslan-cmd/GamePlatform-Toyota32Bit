import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddFriendToLobbyIcon = ({ onPress, style }) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={[styles.bottomSheetIconTouchable, style]}
    >
      <Icon
        name="account-plus"
        size={28}
        color="green"

      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  bottomSheetIconTouchable: {
    padding: 5, // Increased padding for touchable area
  },
});

export default AddFriendToLobbyIcon;