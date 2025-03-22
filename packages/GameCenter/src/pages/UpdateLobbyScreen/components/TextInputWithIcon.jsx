import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../context/ThemeContext'; 

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
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
  },
});

export default TextInputWithIcon;