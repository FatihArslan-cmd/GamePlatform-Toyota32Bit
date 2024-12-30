import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScrollArrow = ({ direction, onPress }) => (
  <TouchableRipple
    style={[styles.arrow, direction === 'left' ? styles.left : styles.right]}
    onPress={onPress}
  >
    <Icon
      name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
      size={48}
      style={styles.icon}
    />
  </TouchableRipple>
);

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    zIndex: 1,
    padding: 8,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  icon: {
    opacity: 0.6,
  },
});

export default ScrollArrow;
