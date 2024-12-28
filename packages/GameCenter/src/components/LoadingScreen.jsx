import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <BlurView
        style={styles.absolute}
        blurType="light" // 'light', 'dark', or 'xlight' kullanabilirsiniz
        blurAmount={10} // Bulanıklık derecesi
        reducedTransparencyFallbackColor="white"
      />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LoadingScreen;
