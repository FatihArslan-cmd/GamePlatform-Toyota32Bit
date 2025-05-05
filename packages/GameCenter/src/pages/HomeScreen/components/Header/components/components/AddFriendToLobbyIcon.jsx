import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const AddFriendToLobbyIcon = ({ leftAction, rightAction }) => {
  const { colors } = useTheme(); 

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={leftAction.onPress}
        style={[styles.bottomSheetButton, styles.leftButton]}
      >
        <View style={styles.buttonContent}>
          <Icon
            name={leftAction.iconName}
            size={TABLET_DEVICE ? 26 : 22}
            color={colors.success} 
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
            size={TABLET_DEVICE ? 26 : 22}
            color={colors.info} 
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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