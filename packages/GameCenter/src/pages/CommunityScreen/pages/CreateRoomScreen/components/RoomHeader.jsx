import React from 'react';
import GrandientText from '../../../../../components/GrandientText';
import { useTheme } from '../../../../../context/ThemeContext'; 

const RoomHeader = () => {
  const { colors } = useTheme(); 

  return (
    <GrandientText
      text="Create a Community"
      colors={colors.languageTextGradient} 
      textStyle={{ fontSize: 32, textAlign: 'center' }}
      gradientDirection="horizontal"
      width={500}
    />
  );
};

export default RoomHeader;