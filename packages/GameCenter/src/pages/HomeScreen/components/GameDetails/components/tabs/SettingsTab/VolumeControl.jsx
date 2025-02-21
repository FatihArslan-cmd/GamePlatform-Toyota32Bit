import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { styles } from '../../../styles';

export const VolumeControl = ({ label, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleVolumePress = (event) => {
    const { locationX, target } = event.nativeEvent;
    target.measure((x, y, width) => {
      const newVolume = Math.max(0, Math.min(1, locationX / width));
      onChange(newVolume);
    });
  };

  const VolumeSteps = () => (
    <View style={{ flexDirection: 'row', width: 200, justifyContent: 'space-between' }}>
      {[0, 0.25, 0.5, 0.75, 1].map((step, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChange(step)}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: value >= step ? '#4a148c' : '#e0e0e0',
            opacity: isDragging ? 1 : 0.7,
          }}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>{label}</Text>
      <TouchableOpacity
        onPress={handleVolumePress}
        onPressIn={() => setIsDragging(true)}
        onPressOut={() => setIsDragging(false)}
        style={{ width: 200 }}
      >
        <ProgressBar
          progress={value ?? 1}
          color="#4a148c"
          style={{ height: 8, marginVertical: 8 }}
        />
      </TouchableOpacity>
      <VolumeSteps />
      <Text style={{ fontSize: 12, color: 'grey', marginTop: 4 , fontFamily: 'Orbitron-ExtraBold',}}>
        {Math.round((value ?? 1) * 100)}%
      </Text>
    </View>
  );
};