import React from 'react';
import { StyleSheet, Image } from 'react-native';

const ScannerOverlay = () => {
  return (
     <Image source={require('./scanning.png')} style={styles.centerImage} />
  );
};

const styles = StyleSheet.create({
   centerImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -100,
    marginTop: -100,
    opacity: 0.6,
  },
});

export default ScannerOverlay;