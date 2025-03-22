import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

const LogoSection = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.logoContainer}>
      <FastImage
        source={require('../../../locales/shape_1136298.png')}
        style={[styles.logoImage]}
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
    marginBottom: 40,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  subtitleText: {
    fontSize: 16,
    color: '#8a2be2',
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: 30,
    letterSpacing: 3,
  },
});

export default LogoSection;