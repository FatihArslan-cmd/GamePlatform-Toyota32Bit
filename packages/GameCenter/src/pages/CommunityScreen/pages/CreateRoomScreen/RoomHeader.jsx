import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const RoomHeader = () => (
  <Text style={styles.title}>Create a new community </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default RoomHeader;