import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import HeaderTitle from './HeaderTitle';
import RightActions from './RightActions';
import styles from './styles';
import BackButton from '../../../components/BackIcon';
const Header = () => {
  return (
    <Appbar.Header style={styles.appbar}>
      <View style={styles.leftContainer}>
        <BackButton  top = {-22} left = {-10}/>
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