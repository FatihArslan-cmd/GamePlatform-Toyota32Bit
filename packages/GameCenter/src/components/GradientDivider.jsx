import LinearGradient from "react-native-linear-gradient";
import React, { memo, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { isTablet } from "../utils/isTablet";

const TABLET_DEVICE = isTablet();

const GradientDivider = ({ colorProps, horizontalMargin, height }) => {
  const { resolvedTheme, colors } = useTheme(); 

  const gradientColors = useMemo(() => {
    if (colorProps && Array.isArray(colorProps) && colorProps.length === 2) {
      return colorProps; 
    }

    if (resolvedTheme === 'dark') {
      return colors.dividerGradientDark || ['#374151', '#4B5563'];
    } else {
      return colors.dividerGradientLight || ['#4A00E0', '#FF8C00']; 
    }
  }, [colorProps, resolvedTheme, colors.dividerGradientDark, colors.dividerGradientLight]);

  const dividerStyle = useMemo(() => ({
    marginHorizontal: horizontalMargin ?? '20%',
    height: height ?? (TABLET_DEVICE ? 4 : 2),
    borderRadius: 2,
    marginVertical: TABLET_DEVICE ? 10 : 5,
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