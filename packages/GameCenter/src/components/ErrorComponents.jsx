import React, { useMemo } from 'react';
import { View,StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';
const ErrorComponents = ({ errorMessage, width = 200, height = 200 }) => {

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      width: width,
      height: height,
    },
    errorText: {
      marginTop: 20,
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
      fontFamily: 'Orbitron-ExtraBold',
    },
  }), [width, height]); 

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../locales/lottie/Error404.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default ErrorComponents;