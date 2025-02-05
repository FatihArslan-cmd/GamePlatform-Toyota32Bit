import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

import emptyStateAnimation from '../locales/lottie/EmptyState.json';

// Reanimated importlarını ekliyoruz
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const EmptyState = ({ message }) => {
  const fadeAnim = useSharedValue(0); // Animated.Value yerine useSharedValue kullanıyoruz

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 750 }); // withTiming ile animasyonu tanımlıyoruz
  }, []); // Bağımlılık dizisini boş bırakıyoruz, sadece mount olduğunda çalışacak

  const animatedStyle = useAnimatedStyle(() => { // useAnimatedStyle ile animated style oluşturuyoruz
    return {
      opacity: fadeAnim.value, // Opaklığı shared value ile bağlıyoruz
    };
  });

  return (
    <Animated.View // Animated.View Reanimated'dan import edildi
      style={[
        styles.container,
        animatedStyle, // animatedStyle'ı style prop'una ekliyoruz
      ]}
    >
      <LottieView
        source={emptyStateAnimation}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      <Text style={styles.textStyle} >{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 250,
    height: 250,
  },
  textStyle:{
    color:"black",
    fontSize:18,
    marginTop:20,
  }
});

export default EmptyState;