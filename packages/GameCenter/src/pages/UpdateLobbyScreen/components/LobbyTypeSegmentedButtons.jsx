import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

const LobbyTypeSegmentedButtons = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lobby Type</Text>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          {
            value: 'Normal',
            label: 'Normal',
            labelStyle: styles.segmentedButtonLabel,
          },
          {
            value: 'Event',
            label: 'Event',
            labelStyle: styles.segmentedButtonLabel,
          },
        ]}
        style={styles.segmentedButtons}
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
  segmentedButtons: {
    marginTop: 8,
  },
  segmentedButtonLabel: {
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default LobbyTypeSegmentedButtons;