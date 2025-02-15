import React from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { styles } from '../../../styles';

export const SwitchSetting = ({ label, value, onChange }) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      color="#4a148c"
    />
  </View>
);
