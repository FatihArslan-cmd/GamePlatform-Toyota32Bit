import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Switch } from 'react-native-paper';

const PasswordInput = ({
  password,
  isPasswordVisible,
  onPasswordChange,
  onToggleVisibility,
  hasPassword,
  onPasswordToggle
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.passwordSwitchContainer}>
        <Text variant="bodyMedium" style={styles.passwordSwitchText}>Password Protected Lobby</Text>
        <Switch
          value={hasPassword}
          onValueChange={onPasswordToggle}
          thumbColor={hasPassword ? '#8a2be2' : null} // Set thumb color when switch is on
          trackColor={{ true: 'rgba(138, 43, 226, 0.6)', false: null }} // Set track color when switch is on
        />
      </View>

      {hasPassword && (
        <TextInput
          label="Lobby Password"
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  passwordSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  passwordSwitchText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
  input: {
    marginTop: 8,
    backgroundColor: 'white',
  },
});

export default PasswordInput;