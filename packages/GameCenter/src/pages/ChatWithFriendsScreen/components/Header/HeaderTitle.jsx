import React from 'react';
import GrandientText from '../../../../components/GrandientText';  
import { useTheme } from '../../../../context/ThemeContext'; 
import { useTranslation } from 'react-i18next'; 

const HeaderTitle = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();
  return (
    <GrandientText
      text={t('chatWithFriends.title')}
      colors={colors.gameCenterText} 
      gradientDirection="horizontal"
      width={400}
    />
  );
};

export default HeaderTitle;