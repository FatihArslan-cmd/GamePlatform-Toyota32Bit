import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper'; // Text'i buradan import ettik

import emptyStateAnimation from '../locales/lottie/EmptyState.json';

const EmptyState = ({ message }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={emptyStateAnimation}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      <Text style={styles.textStyle} >{message}</Text> 
    </View>
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
      color:"white",
      fontSize:18,
      marginTop:20
    }
});

export default EmptyState;