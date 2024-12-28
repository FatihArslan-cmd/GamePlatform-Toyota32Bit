import React from 'react';
import { Svg, Path } from 'react-native-svg';

const WavyLine = ({ color = '#6A4AFF', width = 500, height = 300 }) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 120 30"
    fill="none"
  >
    <Path
      d="M0 15 C15 5, 30 25, 45 15 S75 5, 90 15 S105 25, 120 15"
      stroke={color}
      strokeWidth={3}
      fill="none"
    />
  </Svg>
);

export default WavyLine;
