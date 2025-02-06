import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientDivider = ({ colorProps, horizontalMargin, height }) => {
  // Varsayılan renkler
  const defaultColors = ['#4A00E0', '#FF8C00'];
  const gradientColors = Array.isArray(colorProps) && colorProps.length === 2
    ? colorProps
    : defaultColors;

  // Varsayılan yatay margin değeri
  const defaultHorizontalMargin = '20%';
  const dividerHorizontalMargin = horizontalMargin !== undefined ? horizontalMargin : defaultHorizontalMargin;

  // Varsayılan yükseklik değeri
  const defaultHeight = 4;
  const dividerHeight = height !== undefined ? height : defaultHeight;

  const dynamicDividerStyle = StyleSheet.create({
    divider: {
      marginHorizontal: dividerHorizontalMargin,
      height: dividerHeight, // Yüksekliği dinamik olarak ayarla
    },
  });

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.divider, dynamicDividerStyle.divider]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    borderRadius: 2,
    marginBottom: 16,
  },
});

export default GradientDivider;