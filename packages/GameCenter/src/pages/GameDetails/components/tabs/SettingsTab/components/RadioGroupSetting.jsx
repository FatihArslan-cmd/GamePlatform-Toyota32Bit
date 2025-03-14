import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import { useTheme } from '../../../../../../context/ThemeContext';

export const RadioGroupSetting = ({ label, value, onChange, options }) => {
  const { colors } = useTheme(); 
  const themedStyles = createStyles(colors);

  return (
    <View style={themedStyles.settingItem}>
      <Text style={[themedStyles.settingLabel, { color: colors.text }]}>{label}</Text>
      <RadioButton.Group
        onValueChange={onChange}
        value={value}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center' }}>
          {options.map((option) => (
            <View key={option} style={{ alignItems: 'center' }}>
              <Text style={[themedStyles.settingLabel, { color: colors.text }]}>{option}</Text>
              <RadioButton value={option} color={colors.primary} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};

const createStyles = () => StyleSheet.create({
  settingItem: {
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 8,
  },
});

