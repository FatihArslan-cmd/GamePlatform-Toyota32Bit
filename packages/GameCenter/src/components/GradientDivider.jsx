import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientDivider = ({ colorProps }) => {
  // Varsayılan renkler
  const defaultColors = ['#4A00E0', '#FF8C00'];
  
  const gradientColors = Array.isArray(colorProps) && colorProps.length === 2 
    ? colorProps 
    : defaultColors;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.divider}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: '20%',
    marginBottom: 16,
  },
});

export default GradientDivider;
