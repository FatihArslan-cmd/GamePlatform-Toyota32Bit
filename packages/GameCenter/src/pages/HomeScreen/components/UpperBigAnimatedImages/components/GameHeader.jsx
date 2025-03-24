import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import getFormattedDate from '../../../../../utils/getFormattedDate';
import { useTheme } from '../../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

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
    fontSize: 28,
    color: colors.text,
    letterSpacing: -0.5,
    fontFamily: 'Orbitron-ExtraBold',
  },
  dateText: {
    fontSize: 14,
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
