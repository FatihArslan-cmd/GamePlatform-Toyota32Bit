import React from "react";
import getFormattedDate from "../../../../../utils/getFormattedDate";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet(); 

const GameHeader = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { t } = useTranslation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.sectionTitle}>
        {t('homeScreen.topRatedGames')}
      </Text>
      <Text style={styles.dateText}>{getFormattedDate()}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

const useStyles = (colors) => StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: TABLET_DEVICE ? 28 : 18,
    color: colors.text,
    letterSpacing: -0.5,
    fontFamily: 'Orbitron-ExtraBold',
  },
  dateText: {
    fontSize: TABLET_DEVICE ? 14 : 12,
    color: colors.subText,
    marginTop: 4,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  divider: {
    height: 3,
    borderRadius: 1,
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.border,
  },
});

export default GameHeader;
