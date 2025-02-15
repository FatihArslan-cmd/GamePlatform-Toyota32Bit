import React from 'react';
import { View } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import { styles } from '../../../styles';

export const RadioGroupSetting = ({ label, value, onChange, options }) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingLabel}>{label}</Text>
    <RadioButton.Group
      onValueChange={onChange}
      value={value}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center' }}>
        {options.map((option) => (
          <View key={option} style={{ alignItems: 'center' }}>
            <Text style={styles.settingLabel}>{option}</Text>
            <RadioButton value={option} color="#4a148c" />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  </View>
);