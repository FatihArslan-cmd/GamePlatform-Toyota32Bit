import React from 'react';
import GrandientText from '../../../../components/GrandientText';
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme
import { useTranslation } from 'react-i18next';

const HeaderTitle = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  return (
    <GrandientText
      text={t('communityScreen.community')}
      colors={colors.gameCenterText} 
      textStyle={{ fontSize: 28 }}
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;