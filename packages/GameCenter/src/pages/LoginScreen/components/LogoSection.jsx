import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
const LogoSection = () => {
  return (
    <View style={styles.logoContainer}>
      <FastImage
        source={require('../../../locales/deneme.png')}
        style={{ width: 150, height: 150 }}
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
  subtitleText: {
    fontSize: 16,
    color: '#8a2be2',
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: 5,
    letterSpacing: 3,
  },
});

export default LogoSection;