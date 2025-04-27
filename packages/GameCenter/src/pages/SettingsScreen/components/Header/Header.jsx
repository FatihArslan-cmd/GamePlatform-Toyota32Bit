import BackButton from "../../../../components/BackIcon";
import HeaderTitle from "./HeaderTitle";
import React from "react";
import RightActions from "./RightActions";
import styles from "./styles";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";

const Header = () => {
  const { colors } = useTheme(); 

  return (
    <Appbar.Header style={[styles.appbar, { backgroundColor: colors.card }]}> 
      <View style={styles.leftContainer}>
        <BackButton top={-15} left={0} padding={0} />
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