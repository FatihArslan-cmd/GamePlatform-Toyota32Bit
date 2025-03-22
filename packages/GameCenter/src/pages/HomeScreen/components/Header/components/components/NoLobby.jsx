import React from 'react';
import {  StyleSheet } from 'react-native';
import {  Surface } from 'react-native-paper';
import EmptyState from '../../../../../../components/EmptyState';
import { useTheme } from '../../../../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const NoLobby = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
      <EmptyState message={t('homeScreen.noLobby')} color={colors.text}/>
  );
};

export default NoLobby;