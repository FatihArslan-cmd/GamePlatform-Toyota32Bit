import GrandientText from "../../../../../components/GrandientText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const RoomHeader = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  return (
    <GrandientText
      text={t('communityScreen.Create a Community')}
      colors={colors.languageTextGradient} 
      textStyle={{ fontSize: TABLET_DEVICE ? 32 : 24, textAlign: 'center' }}
      gradientDirection="horizontal"
      width={500}
    />
  );
};

export default RoomHeader;