import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Switch } from 'react-native-paper';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const PasswordInput = ({
  password,
  isPasswordVisible,
  onPasswordChange,
  onToggleVisibility,
  hasPassword,
  onPasswordToggle
}) => {
  const { colors } = useTheme(); 

  return (
    <View style={styles.container}>
      <View style={styles.passwordSwitchContainer}>
        <Text variant="bodyMedium" style={[styles.passwordSwitchText, { color: colors.text }]}>Password Protected Lobby</Text> {/* Themed text color */}
        <Switch
          value={hasPassword}
          onValueChange={onPasswordToggle}
          thumbColor={hasPassword ? colors.primary : null} 
          trackColor={{ true: colors.primary, false: null }} 
        />
      </View>

      {hasPassword && (
        <TextInput
        label={
          <Text style={{ color: colors.text }}>Lobby Password</Text>
        }
          mode="outlined"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!isPasswordVisible}
          left={<TextInput.Icon icon="lock" color={colors.primary} />} 
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={onToggleVisibility}
              iconColor={colors.text}
            />
          }
          style={[styles.input, { backgroundColor: colors.card }]} 
          outlineStyle={{ borderColor: colors.border }} 
          textColor={colors.text} 
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
  },
});

export default PasswordInput;