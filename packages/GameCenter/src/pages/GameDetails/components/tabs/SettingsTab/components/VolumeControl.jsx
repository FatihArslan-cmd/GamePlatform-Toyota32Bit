import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { useTheme } from '../../../../../../context/ThemeContext';

export const VolumeControl = ({ label, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { colors } = useTheme(); 
  const themedStyles = createStyles(colors); 

  const handleVolumePress = (event) => {
    const { locationX, target } = event.nativeEvent;
    target.measure((x, y, width) => {
      const newVolume = Math.max(0, Math.min(1, locationX / width));
      onChange(newVolume);
    });
  };

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
      <TouchableOpacity
        onPress={handleVolumePress}
        onPressIn={() => setIsDragging(true)}
        onPressOut={() => setIsDragging(false)}
        style={{ width: '100%' }}
      >
        <ProgressBar
          progress={value ?? 1}
          color={colors.primary}
          style={themedStyles.progressBar}
        />
      </TouchableOpacity>
      <VolumeSteps />
      <Text style={[themedStyles.volumePercentageText, { color: colors.subText }]}>
        {Math.round((value ?? 1) * 100)}%
      </Text>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  settingItem: {
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 8,
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
    width: 20, 
    height: 20,
    borderRadius: 10,
    opacity: 0.7,
  },
  volumePercentageText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Orbitron-ExtraBold',
  },
});