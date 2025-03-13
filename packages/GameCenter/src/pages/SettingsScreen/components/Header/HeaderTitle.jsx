import React from 'react';
import GrandientText from '../../../../components/GrandientText';
import { useTheme } from '../../../../context/ThemeContext';  

const HeaderTitle = () => {
  const { colors } = useTheme(); 

  return (
    <GrandientText
      text="Settings"
      colors={colors.languageTextGradient} 
      textStyle={{ fontSize: 28, color: colors.text }} 
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;