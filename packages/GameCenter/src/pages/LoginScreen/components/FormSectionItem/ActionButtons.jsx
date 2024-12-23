import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ActionButtons = ({ scaleAnim, onLoginPress }) => (
  <>
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Button
        mode="contained"
        onPress={onLoginPress}
        style={styles.loginButton}
        labelStyle={styles.buttonLabel}
      >
        START GAME
      </Button>
    </Animated.View>

    <Button
      mode="outlined"
      style={styles.signupButton}
      labelStyle={styles.signupButtonLabel}
    >
      CREATE NEW ACCOUNT
    </Button>
  </>
);

const styles = StyleSheet.create({
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#8a2be2',
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  signupButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
  },
  signupButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
});

export default ActionButtons;
