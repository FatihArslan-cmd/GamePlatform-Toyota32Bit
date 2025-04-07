import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

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
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          width: '100%', 
          alignItems: 'center' 
        }}>
          {options.map((option) => (
            <View 
              key={option.value} 
              style={{ alignItems: 'center' }}
            >
              <Text style={[themedStyles.settingLabel, { color: colors.text }]}>
                {option.label}
              </Text>
              <RadioButton 
                value={option.value} 
                color={colors.primary} 
              />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};

const createStyles = () => StyleSheet.create({
  settingItem: {
    marginBottom: TABLET_DEVICE ? 25 : 15,
  },
  settingLabel: {
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 12,
  },
});