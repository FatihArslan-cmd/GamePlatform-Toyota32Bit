import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import ProfileImage from './ProfileImage';
import HeaderTitle from './HeaderTitle';
import RightActions from './RightActions';
import createStyles from './styles'; 
import { useTheme } from '../../../../context/ThemeContext'; 

const Header = () => {
  const { colors } = useTheme(); 
  const styles = createStyles(colors);

  return (
    <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
      <View style={styles.leftContainer}>
        <ProfileImage />
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