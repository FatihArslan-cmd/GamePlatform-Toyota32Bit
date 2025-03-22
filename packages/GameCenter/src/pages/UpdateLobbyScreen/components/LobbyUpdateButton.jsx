import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLobbyUpdate } from '../context/LobbyUpdateContext';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; 

const LobbyUpdateButton = () => {
  const { loading, handleUpdateLobby } = useLobbyUpdate();
  const { colors } = useTheme();
  const { t } = useTranslation(); 

  return (
    <Button
      mode="contained"
      onPress={handleUpdateLobby}
      style={[styles.updateButton, { backgroundColor: colors.primary }]}
      contentStyle={styles.buttonContent}
      loading={loading}
      disabled={loading}
      buttonColor={colors.primary}
      icon={({ size, color }) => <Icon name="check" size={size} color={colors.card} />}
    >
      <Text style={[styles.updateButtonText, { color: colors.card }]}>
        {loading ? t('updateLobbyScreen.updatingButton') : t('updateLobbyScreen.updateLobbyButton')} {/* Translated "Updating..." and "Update Lobby" */}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    marginTop: 10,
    borderRadius: 12,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  updateButtonText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default LobbyUpdateButton;