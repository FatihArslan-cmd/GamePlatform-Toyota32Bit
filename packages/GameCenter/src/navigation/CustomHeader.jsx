import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function CustomHeader() {
  return (
    <BlurView
      style={styles.blurContainer}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    >
      <Text style={styles.headerTitle}>Home</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});