import BackButton from "../../../../components/BackIcon";
import HeaderTitle from "./HeaderTitle";
import React from "react";
import RightActions from "./RightActions";
import styles from "./styles";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";

// Header/Header.js

const Header = () => {
  const { colors } = useTheme(); // Use the useTheme hook
  return (
    <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.leftContainer}>
        <BackButton top={-14} left={0} padding={0} />
      </View>

      <View style={styles.centerContainer}>
        <HeaderTitle />
      </View>

      <View style={styles.rightContainer}>
        <RightActions />
      </View>
    </Appbar.Header>
  );
};

export default Header;