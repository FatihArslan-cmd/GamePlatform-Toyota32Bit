import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoSection = () => {
  return (
    <View style={styles.logoContainer}>
      <Icon name="gamepad-variant" size={80} color="#8a2be2" />
      <Text style={styles.welcomeText}>GAME CENTER</Text>
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