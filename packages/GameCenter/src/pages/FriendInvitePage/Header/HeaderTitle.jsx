import GrandientText from "../../../components/GrandientText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const HeaderTitle = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <GrandientText
      text={t('friendInvitePage.inviteFriends')}
      colors={colors.languageTextGradient}
      textStyle={{ fontSize: TABLET_DEVICE ? 28 : 20 }}
      gradientDirection="horizontal"
      width={350}
    />
  );
};

export default HeaderTitle;