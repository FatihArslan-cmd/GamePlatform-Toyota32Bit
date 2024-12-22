import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const OptionsSection = ({ rememberMe, setRememberMe, setIsForgotPassword }) => (
  <View style={styles.container}>
    <TouchableRipple onPress={() => setRememberMe(!rememberMe)}>
      <Text style={styles.checkboxLabel}>
        {rememberMe ? '☑ Remember Me' : '☐ Remember Me'}
      </Text>
    </TouchableRipple>

    <TouchableRipple onPress={() => setIsForgotPassword(true)} style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableRipple>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'RussoOne-Regular',
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
