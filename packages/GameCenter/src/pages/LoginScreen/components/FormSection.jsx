import React, { useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { TextInput, Button, Checkbox, TouchableRipple, Text } from 'react-native-paper';

const FormSection = ({ onLoginPress, scaleAnim, onSignupPress, onForgotPasswordPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        label="Email / Username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        left={<TextInput.Icon icon="account-circle" color="#8a2be2" />}
        theme={{ colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: '#fff' } }}
        outlineColor="#8a2be250"
        activeOutlineColor="#8a2be2"
        textColor="#fff"
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
        left={<TextInput.Icon icon="shield-key" color="#8a2be2" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
            color="#8a2be2"
          />
        }
        theme={{ colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: '#fff' } }}
        outlineColor="#8a2be250"
        activeOutlineColor="#8a2be2"
        textColor="#fff"
      />

      <View style={styles.optionsContainer}>
        <Checkbox.Item
          label="Remember Me"
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => setRememberMe(!rememberMe)}
          labelStyle={styles.checkboxLabel}
          color="#8a2be2"
        />

        <TouchableRipple onPress={onForgotPasswordPress} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableRipple>
      </View>

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
        onPress={onSignupPress}
        style={styles.signupButton}
        labelStyle={styles.signupButtonLabel}
      >
        CREATE NEW ACCOUNT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff08',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be230',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff10',
    fontFamily: 'RussoOne-Regular',
  },
  optionsContainer: {
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
  loginButton: {
    marginBottom: 10,
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

export default FormSection;