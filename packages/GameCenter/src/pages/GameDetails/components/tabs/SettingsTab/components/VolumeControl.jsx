import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

export const VolumeControl = ({ label, value, onChange }) => {
  const { colors } = useTheme(); 
  const themedStyles = createStyles(colors); 


  const VolumeSteps = () => (
    <View style={[themedStyles.volumeStepsContainer, { justifyContent: 'space-between' }]}>
      {[0, 0.25, 0.5, 0.75, 1].map((step, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChange(step)}
          style={[themedStyles.volumeStep, { backgroundColor: value >= step ? colors.primary : colors.border }]}
        />
      ))}
    </View>
  );

  return (
    <View style={themedStyles.settingItem}>
      <Text style={[themedStyles.settingLabel, { color: colors.text }]}>{label}</Text>
     
        <ProgressBar
          progress={value ?? 1}
          color={colors.primary}
          style={themedStyles.progressBar}
        />
      <VolumeSteps />
      <Text style={[themedStyles.volumePercentageText, { color: colors.subText }]}>
        {Math.round((value ?? 1) * 100)}%
      </Text>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  settingItem: {
    marginBottom: TABLET_DEVICE ? 25 : 15,
  },
  settingLabel: {
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 12,
    color: colors.text,
  },
  progressBar: {
    height: 8,
    marginVertical: 8,
  },
  volumeStepsContainer: { 
    flexDirection: 'row',
    width: '100%', 
    marginTop: 8, 
  },
  volumeStep: {
    width: TABLET_DEVICE ? 20 : 10, 
    height: TABLET_DEVICE ? 20 : 10,
    borderRadius: 10,
    opacity: 0.7,
  },
  volumePercentageText: {
    fontSize: TABLET_DEVICE ? 12 : 10,
    marginTop: 7,
    fontFamily: 'Orbitron-ExtraBold',
  },
});