import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";

const CUSTOM_FONT_FAMILY = 'Orbitron-ExtraBold';

const PasswordInput = ({
  password,
  isPasswordVisible,
  onPasswordChange,
  onToggleVisibility,
  hasPassword,
  onPasswordToggle,
  t
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.passwordSwitchContainer}>
        <Text variant="bodyMedium" style={[styles.passwordSwitchText, { color: colors.text }]}>
          {t('createLobbyModal.passwordInput.hasPassword')}
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
                <Text style={{ color: colors.text, fontFamily: CUSTOM_FONT_FAMILY }}>
                    {t('createLobbyModal.passwordInput.password')}
                </Text>
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
            style={[styles.inputContainer, { backgroundColor: colors.card }]}
            outlineStyle={{ borderColor: colors.border }}
            textColor={colors.text}
            placeholderTextColor={colors.subText}
            contentStyle={{
                fontFamily: CUSTOM_FONT_FAMILY,
                color: colors.text,
            }}
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
    fontFamily: CUSTOM_FONT_FAMILY,
  },
  inputContainer: {
    marginTop: 8,
  },
});

export default PasswordInput;