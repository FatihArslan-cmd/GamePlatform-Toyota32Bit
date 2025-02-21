import React, { memo, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientDivider = ({ colorProps, horizontalMargin, height }) => {
  const gradientColors = useMemo(() => (
    Array.isArray(colorProps) && colorProps.length === 2
      ? colorProps
      : ['#4A00E0', '#FF8C00']
  ), [colorProps]);

  const dividerStyle = useMemo(() => ({
    marginHorizontal: horizontalMargin ?? '20%',
    height: height ?? 4,
    borderRadius: 2,
    marginBottom: 16,
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
