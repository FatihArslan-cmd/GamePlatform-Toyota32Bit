import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddFriendToLobbyIcon = ({ leftAction, rightAction }) => {
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={leftAction.onPress}
        style={[styles.bottomSheetButton, styles.leftButton]}
      >
        <View style={styles.buttonContent}>
          <Icon
            name={leftAction.iconName}
            size={26}
            color="green"
          />
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={rightAction.onPress}
        style={[styles.bottomSheetButton, styles.rightButton]}
      >
        <View style={styles.buttonContent}>
          <Icon
            name={rightAction.iconName}
            size={26}
            color="blue"
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Added to push buttons to ends
    alignItems: 'center', // Optional: to vertically center the buttons if needed
  },
  bottomSheetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonContent: {
    alignItems: 'center',
  },
});

export default AddFriendToLobbyIcon;