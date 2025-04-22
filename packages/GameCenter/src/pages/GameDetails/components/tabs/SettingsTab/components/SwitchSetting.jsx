import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";

export const SwitchSetting = ({ label, value, onChange }) => {
  const { colors } = useTheme(); 
  const themedStyles = createStyles(colors); 

  return (
    <View style={themedStyles.settingItem}>
      <Text style={[themedStyles.settingLabel, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        color={colors.primary} 
      />
    </View>
  );
};

const createStyles = () => StyleSheet.create({
  settingItem: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginRight: 8,
  },
});

