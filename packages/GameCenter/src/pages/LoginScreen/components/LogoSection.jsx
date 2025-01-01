import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
const LogoSection = () => {
  return (
    <View style={styles.logoContainer}>
      <FastImage
        source={require('../../../locales/icon.png')}
        style={{ width: 175, height: 175 }}
        ></FastImage>
      <Text style={styles.subtitleText}>Enter your realm</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Anton-Regular',
    marginTop: 10,
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: 16,
    color: '#8a2be2',
    fontFamily: 'Orbitron-VariableFont_wght',
    marginTop: 5,
    letterSpacing: 3,
  },
});

export default LogoSection;