import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';

const AnimatedHeader = ({ scrollY }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 200], // Scroll değerine göre
    outputRange: [-100, 0], // Header yukarıdan aşağıya kayar
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <Appbar.Header style={styles.appbar}>
        <TextInput
          mode="outlined"
          placeholder="Search games..."
          style={styles.searchInput}
        />
      </Appbar.Header>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  appbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
});

export default AnimatedHeader;
