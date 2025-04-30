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

  return (
    <View style={{ flexDirection: 'row' }}>
      <Tooltip title="Search">
      <IconButton
        icon="magnify"
        size={TABLET_DEVICE ? 28 : 20}
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