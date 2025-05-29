import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import navigationService from "../../../../../../shared/states/navigationService";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const AddFriendToLobbyIcon = ({ closeBottomSheet, leftButton, rightButton }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => {
          navigationService.navigate('FriendInvitePage');
          if (typeof closeBottomSheet === 'function') {
             closeBottomSheet();
          }
        }}
        style={[styles.bottomSheetButton, leftButton]}
      >
        <View style={styles.buttonContent}>
          <Icon
            name="account-plus"
            size={TABLET_DEVICE ? 26 : 22}
            color={colors.success}
          />
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          navigationService.navigate('UpdateLobbyScreen');
          if (typeof closeBottomSheet === 'function') {
             closeBottomSheet();
          }
        }}
        style={[styles.bottomSheetButton, rightButton]}
      >
        <View style={styles.buttonContent}>
          <Icon
            name="cog-outline"
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
    padding: 8,
  },
  buttonContent: {
    alignItems: 'center',
  },
});

export default AddFriendToLobbyIcon;