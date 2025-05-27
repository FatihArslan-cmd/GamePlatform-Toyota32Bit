import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Switch, Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";

const PasswordInput = ({
  password,
  isPasswordVisible,
  onPasswordChange,
  onToggleVisibility,
  hasPassword,
  onPasswordToggle,
  t // Receive t function as prop
}) => {
  const { colors } = useTheme();
  // const { t } = useTranslation(); // No need to use hook here, it's passed as prop

  return (
    <View style={styles.container}>
      <View style={styles.passwordSwitchContainer}>
        <Text variant="bodyMedium" style={[styles.passwordSwitchText, { color: colors.text }]}>
          {t('createLobbyModal.passwordInput.hasPassword')} {/* Translated text */}
        </Text>
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
          <Text style={{ color: colors.text }}>{t('createLobbyModal.passwordInput.password')}</Text> 
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