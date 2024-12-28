import React from 'react';
import InputField from './InputField';

const InputSection = ({ email, password, setEmail, setPassword, showPassword, setShowPassword }) => (
  <>
    <InputField
      label="Email / Username"
      value={email}
      onChangeText={setEmail}
      leftIcon="account-circle"
    />
    <InputField
      label="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      leftIcon="shield-key"
      rightIcon={showPassword ? 'eye-off' : 'eye'}
      onRightIconPress={() => setShowPassword(!showPassword)}
    />
  </>
);

export default InputSection;
