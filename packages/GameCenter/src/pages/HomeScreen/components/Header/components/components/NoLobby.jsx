import React from 'react';
import {  StyleSheet } from 'react-native';
import {  Surface } from 'react-native-paper';
import EmptyState from '../../../../../../components/EmptyState';
import { useTheme } from '../../../../../../context/ThemeContext';

const NoLobby = () => {
  const { colors } = useTheme();
  return (
      <EmptyState message='No lobby you joined' color={colors.text}/>
  );
};

export default NoLobby;