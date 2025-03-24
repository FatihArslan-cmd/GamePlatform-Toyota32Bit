import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../../../context/ThemeContext';
const ScrollArrow = ({ direction, onPress }) => {
  const { colors } = useTheme(); 
  const themedStyles = useStyles(colors); 

  return (
    <TouchableRipple
      style={[themedStyles.arrow, direction === 'left' ? themedStyles.left : themedStyles.right]}
      onPress={onPress}
    >
      <Icon
        name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        size={48}
        style={[themedStyles.icon, { color: colors.text }]} 
      />
    </TouchableRipple>
  );
};

const useStyles = (colors) => StyleSheet.create({
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