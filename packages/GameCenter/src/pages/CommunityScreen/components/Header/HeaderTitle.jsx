import React from 'react';
import GrandientText from '../../../../components/GrandientText';
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme

const HeaderTitle = () => {
  const { colors } = useTheme(); 

  return (
    <GrandientText
      text="Community"
      colors={colors.gameCenterText} 
      textStyle={{ fontSize: 28 }}
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;