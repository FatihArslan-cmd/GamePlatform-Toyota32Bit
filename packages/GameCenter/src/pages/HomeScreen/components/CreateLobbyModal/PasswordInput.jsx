import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const PasswordInput = ({ password, isPasswordVisible, onPasswordChange, onToggleVisibility }) => {
  return (
    
    <TextInput
      label="Lobby Password (Optional)"
      mode="outlined"
      value={password}
      onChangeText={onPasswordChange}
      secureTextEntry={!isPasswordVisible}
      right={
        <TextInput.Icon
          icon={isPasswordVisible ? "eye-off" : "eye"}
          onPress={onToggleVisibility}
        />
      }
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
});

export default PasswordInput;