import GrandientText from "../../../../components/GrandientText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet(); 

const HeaderTitle = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  return (
    <GrandientText
      text={t('communityScreen.community')}
      colors={colors.gameCenterText} 
      textStyle={{ fontSize: TABLET_DEVICE ? 28 : 20 }}
      gradientDirection="horizontal"
    />
  );
};

export default HeaderTitle;