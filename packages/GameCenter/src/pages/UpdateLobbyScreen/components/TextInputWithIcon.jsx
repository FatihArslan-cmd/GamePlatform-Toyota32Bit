import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const TextInputWithIcon = ({ label, value, onChangeText, placeholder, iconName, keyboardType }) => {
  const { colors } = useTheme();

  const showClearIcon = value && value.length > 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        outlineColor={colors.primary}
        activeOutlineColor={colors.primary}
        style={[styles.input, { backgroundColor: colors.card }]}
        contentStyle={[styles.inputTextContent, { color: colors.text }]}
        left={
          <TextInput.Icon icon={() => <Icon name={iconName} size={24} color={colors.primary} />} />
        }
        right={
          showClearIcon ? (
            <TextInput.Icon
              icon={() => <Icon name="close" size={24} color={colors.primary} />}
              onPress={() => onChangeText('')}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 8,
  },
  input: {
    fontSize: TABLET_DEVICE ? 16 : 12,
  },
  inputTextContent: {
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default TextInputWithIcon;