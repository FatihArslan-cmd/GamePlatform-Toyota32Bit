import React, { memo, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

const GradientDivider = ({ colorProps, horizontalMargin, height }) => {
  const { resolvedTheme, colors } = useTheme(); // Use useTheme to get theme info

  const gradientColors = useMemo(() => {
    if (colorProps && Array.isArray(colorProps) && colorProps.length === 2) {
      return colorProps; // Use provided colorProps if valid
    }

    // Define theme-aware gradient colors
    if (resolvedTheme === 'dark') {
      return colors.dividerGradientDark || ['#374151', '#4B5563']; // Dark theme colors or defaults
    } else {
      return colors.dividerGradientLight || ['#4A00E0', '#FF8C00']; // Light theme colors or defaults (current light theme colors)
    }
  }, [colorProps, resolvedTheme, colors.dividerGradientDark, colors.dividerGradientLight]);

  const dividerStyle = useMemo(() => ({
    marginHorizontal: horizontalMargin ?? '20%',
    height: height ?? 4,
    borderRadius: 2,
    marginVertical: 10,
  }), [horizontalMargin, height]);

  return (
    <LinearGradient
      colors={gradientColors}
      start={START_POINT}
      end={END_POINT}
      style={dividerStyle}
    />
  );
};

const START_POINT = { x: 0, y: 0 };
const END_POINT = { x: 1, y: 0 };

export default memo(GradientDivider);