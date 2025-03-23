import React from 'react';
import GrandientText from '../../../../../components/GrandientText';
import { useTheme } from '../../../../../context/ThemeContext'; 
import {useTranslation} from 'react-i18next';

const RoomHeader = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();
  return (
    <GrandientText
      text={t('communityScreen.Create a Community')}
      colors={colors.languageTextGradient} 
      textStyle={{ fontSize: 32, textAlign: 'center' }}
      gradientDirection="horizontal"
      width={500}
    />
  );
};

export default RoomHeader;