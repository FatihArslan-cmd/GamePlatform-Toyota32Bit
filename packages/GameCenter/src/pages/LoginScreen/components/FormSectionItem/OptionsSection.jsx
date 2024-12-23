import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface, Checkbox } from 'react-native-paper';

const OptionsSection = ({ rememberMe, setRememberMe, setIsForgotPassword }) => (
  <Surface style={styles.container}>
    <TouchableRipple
      onPress={() => setRememberMe(!rememberMe)}
      style={styles.checkboxContainer}
    >
      <>
        <Checkbox
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => setRememberMe(!rememberMe)}
          color="#8a2be2"
        />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </>
    </TouchableRipple>

    <TouchableRipple onPress={() => setIsForgotPassword(true)} style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableRipple>
  </Surface>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor:'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'RussoOne-Regular',
    marginLeft: 8,
  },
  forgotPassword: {
    marginRight: 10,
  },
  forgotPasswordText: {
    color: '#8a2be2',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default OptionsSection;
