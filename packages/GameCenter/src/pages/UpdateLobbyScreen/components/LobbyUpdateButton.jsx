import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useLobbyUpdate } from "../context/LobbyUpdateContext";

const TABLET_DEVICE = isTablet();

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
      icon={({ size }) => <Icon name="check" size={size} color={colors.card} />}
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
    fontSize: TABLET_DEVICE ? 16 : 10,
  },
});

export default LobbyUpdateButton;