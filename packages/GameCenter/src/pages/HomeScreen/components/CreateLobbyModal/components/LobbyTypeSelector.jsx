import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const LobbyTypeSelector = ({ lobbyType, onToggle }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.lobbyTypeContainer}>
      <Text style={styles.label}>
        {t('createLobbyModal.lobbyTypeSelector.lobbyType')} 
      </Text>
      <Button
        mode={lobbyType === 'Normal' ? 'contained' : 'outlined'}
        onPress={onToggle}
        style={styles.typeButton}
        labelStyle={{   fontFamily: 'Orbitron-ExtraBold',
        }}
      >
        {lobbyType === 'Normal' ? 
        t('createLobbyModal.lobbyTypeSelector.normal') 
        :
         t('createLobbyModal.lobbyTypeSelector.event')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyTypeContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
  typeButton: {
    marginTop: 12,
    borderRadius: 20,
  },
});

export default LobbyTypeSelector;