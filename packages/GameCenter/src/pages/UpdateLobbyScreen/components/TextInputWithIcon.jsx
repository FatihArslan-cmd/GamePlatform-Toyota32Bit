// src/components/TextInputWithIcon.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextInputWithIcon = ({ label, value, onChangeText, placeholder, iconName, keyboardType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        outlineColor="#8a2be2"
        activeOutlineColor="#8a2be2"
        style={styles.input}
        left={<TextInput.Icon icon={() => <Icon name={iconName} size={24} color="#8a2be2" />} />}
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
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default TextInputWithIcon;