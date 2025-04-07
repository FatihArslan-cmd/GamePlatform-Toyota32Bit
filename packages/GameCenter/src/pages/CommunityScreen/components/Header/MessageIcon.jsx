import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();


const MessageIcon = ({ navigateTo }) => {
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  const iconSize = TABLET_DEVICE ? 24 : 18;

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
        iconColor={colors.text} 
        size={iconSize}
        style={{ opacity: 0.7 }}
      />
    </TouchableOpacity>
    </Tooltip>
  );
};

export default MessageIcon;