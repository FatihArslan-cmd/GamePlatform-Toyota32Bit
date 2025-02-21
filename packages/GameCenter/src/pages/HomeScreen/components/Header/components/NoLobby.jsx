import React from 'react';
import {  StyleSheet } from 'react-native';
import {  Surface } from 'react-native-paper';
import EmptyState from '../../../../../components/EmptyState';

const NoLobby = () => {
  return (
    <Surface style={styles.noLobbyContainer}>
      <EmptyState message='No lobby you joined'/>
    </Surface>
  );
};

const styles = StyleSheet.create({
  noLobbyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noLobbyText: {
    marginBottom: 20,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default NoLobby;