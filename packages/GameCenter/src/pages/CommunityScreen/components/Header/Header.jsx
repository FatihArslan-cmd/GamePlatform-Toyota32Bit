import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import ProfileImage from './ProfileImage';
import HeaderTitle from './HeaderTitle';
import RightActions from './RightActions';
import styles from './styles';

const Header = () => {
  return (
    <Appbar.Header style={styles.appbar}>
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