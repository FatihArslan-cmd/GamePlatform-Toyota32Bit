import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ErrorDisplay = ({ error }) => (
  error ? <Text style={styles.errorText}>{error}</Text> : null
);

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default ErrorDisplay;