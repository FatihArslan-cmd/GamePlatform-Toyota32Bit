import FastImage from "react-native-fast-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const LogoSection = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.logoContainer}>
      <FastImage
        source={require('../../../locales/shape_1136298.png')}
        style={styles.logoImage}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.subtitleText}>
        {t('loginScreen.title')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: TABLET_DEVICE ? 40 : 25,
  },
  logoImage: {
    width: TABLET_DEVICE ? 150 : 100,
    height: TABLET_DEVICE ? 150 : 100,
  },
  subtitleText: {
    fontSize: TABLET_DEVICE ? 16 : 14,
    color: '#8a2be2',
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: TABLET_DEVICE ? 30 : 20,
    letterSpacing: TABLET_DEVICE ? 3 : 2,
    textAlign: 'center',
  },
});

export default LogoSection;