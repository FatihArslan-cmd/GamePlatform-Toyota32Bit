// Header/HeaderTitle.js
import React from 'react';
import GrandientText from '../../../../components/GrandientText';  // Adjust path if needed
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme

const HeaderTitle = () => {
  const { colors } = useTheme(); 
  return (
    <GrandientText
      text="Chat with Friends"
      colors={colors.gameCenterText} 
      gradientDirection="horizontal"
      width={400}
    />
  );
};

export default HeaderTitle;