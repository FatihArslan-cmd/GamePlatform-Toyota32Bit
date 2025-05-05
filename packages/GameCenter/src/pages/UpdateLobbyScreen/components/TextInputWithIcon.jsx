import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const TextInputWithIcon = ({ label, value, onChangeText, placeholder, iconName, keyboardType }) => {
  const { colors } = useTheme(); 

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
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        left={<TextInput.Icon icon={() => <Icon name={iconName} size={24} color={colors.primary} />} />}
        textColor={colors.text} 
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
});

export default TextInputWithIcon;