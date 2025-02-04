import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const CreateButton = ({ onPress, loading }) => (
  <Button
    mode="contained"
    onPress={onPress}
    loading={loading}
    disabled={loading}
    style={styles.createButton}
    contentStyle={styles.createButtonContent}
    labelStyle={{ color: 'white' }}
  >
    <Text style={{ fontFamily: 'Orbitron-ExtraBold', color: 'white' }}>
      Create Room
    </Text>
  </Button>
);

const styles = StyleSheet.create({
  createButton: {
    borderRadius: 10,
    backgroundColor: '#007bff'
  },
  createButtonContent: {
    height: 50,
  },
});

export default CreateButton;