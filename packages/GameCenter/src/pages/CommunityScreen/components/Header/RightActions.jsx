import MessageIcon from "./MessageIcon";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const RightActions = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  const iconSize = TABLET_DEVICE ? 24 : 18;

  return (
    <View style={{ flexDirection: 'row' }}>
        <MessageIcon navigateTo="ChatWithFriendsScreen"/>
        <Tooltip title="Create Community">
      <IconButton
        icon="plus"
        size={iconSize}
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
        size={iconSize}
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