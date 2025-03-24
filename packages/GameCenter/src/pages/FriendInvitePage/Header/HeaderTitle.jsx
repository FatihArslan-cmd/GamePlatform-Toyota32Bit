import React from 'react';
import GrandientText from '../../../components/GrandientText';
import { useTheme } from '../../../context/ThemeContext'; 
import { useTranslation } from 'react-i18next';
const HeaderTitle = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <GrandientText
      text={t('friendInvitePage.inviteFriends')}
      colors={colors.languageTextGradient}
      textStyle={{ fontSize: 28 }}
      gradientDirection="horizontal"
      width={350}
    />
  );
};

export default HeaderTitle;