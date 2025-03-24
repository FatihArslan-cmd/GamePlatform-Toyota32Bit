import React from 'react';
import GrandientText from '../../../../components/GrandientText';
import { useTheme } from '../../../../context/ThemeContext';  
import { useTranslation } from 'react-i18next';
const HeaderTitle = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();
  return (
    <GrandientText
      text={t('settingsScreen.headerTitle')}
      colors={colors.gameCenterText} 
      textStyle={{ fontSize: 28, color: colors.text }} 
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;