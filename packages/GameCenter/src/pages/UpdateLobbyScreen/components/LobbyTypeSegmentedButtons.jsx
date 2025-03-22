import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { useLobbyUpdate } from '../context/LobbyUpdateContext';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; 

const LobbyTypeSegmentedButtons = () => {
  const { lobbyType, setLobbyType } = useLobbyUpdate();
  const { colors } = useTheme();
  const { t } = useTranslation(); 

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{t('updateLobbyScreen.lobbyTypeLabel')}</Text> {/* Translated "Lobby Type" */}
      <SegmentedButtons
        value={lobbyType}
        onValueChange={setLobbyType}
        buttons={[
          {
            value: 'Normal',
            label: t('updateLobbyScreen.normalLobbyType'), 
            labelStyle: [styles.segmentedButtonLabel, { color: colors.text }],
            style: { backgroundColor: colors.card }
          },
          {
            value: 'Event',
            label: t('updateLobbyScreen.eventLobbyType'), 
            labelStyle: [styles.segmentedButtonLabel, { color: colors.text }],
            style: { backgroundColor: colors.card }
          },
        ]}
        style={[styles.segmentedButtons, { backgroundColor: colors.card }]}
        theme={{ colors: { primary: colors.primary, surface: colors.card, text: colors.text } }}
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
  },
  segmentedButtons: {
    marginTop: 8,
  },
  segmentedButtonLabel: {
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default LobbyTypeSegmentedButtons;