import React from 'react';
import GrandientText from '../../../components/GrandientText';
import { useTheme } from '../../../context/ThemeContext'; 

const HeaderTitle = () => {
  const { colors } = useTheme();

  return (
    <GrandientText
      text="Invite Friends"
      colors={colors.languageTextGradient}
      textStyle={{ fontSize: 28 }}
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;