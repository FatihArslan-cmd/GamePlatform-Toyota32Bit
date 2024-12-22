import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from './FormSectionItem/InputField';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtons from './FormSectionItem/ActionButtons';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection';

const FormSection = ({ onLoginPress, scaleAnim, onSignupPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <View style={styles.formContainer}>
      <InputField
        label="Email / Username"
        value={email}
        onChangeText={setEmail}
        leftIcon="account-circle"
        style={styles.input}
      />

      {!isForgotPassword && (
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          leftIcon="shield-key"
          rightIcon={showPassword ? 'eye-off' : 'eye'}
          onRightIconPress={() => setShowPassword(!showPassword)}
          style={styles.input}
        />
      )}

      {!isForgotPassword ? (
        <>
          <OptionsSection
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            setIsForgotPassword={setIsForgotPassword}
          />
          <ActionButtons scaleAnim={scaleAnim} onLoginPress={onLoginPress} onSignupPress={onSignupPress} />
        </>
      ) : (
        <ForgotPasswordSection
          onSendCode={() => console.log('Send code pressed')}
          onBackToLogin={() => setIsForgotPassword(false)}
        />
      )}
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
});

export default FormSection;
