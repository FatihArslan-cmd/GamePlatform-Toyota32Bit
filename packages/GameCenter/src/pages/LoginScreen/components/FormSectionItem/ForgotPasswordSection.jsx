import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ForgotPasswordSection = ({ onSendCode, onBackToLogin }) => (
  <>
    <Button
      mode="contained"
      onPress={onSendCode}
      style={styles.loginButton}
      labelStyle={styles.buttonLabel}
    >
      Send Code
    </Button>

    <Button
      mode="outlined"
      onPress={onBackToLogin}
      style={styles.signupButton}
      labelStyle={styles.signupButtonLabel}
    >
      Back to Login
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

export default ForgotPasswordSection;
