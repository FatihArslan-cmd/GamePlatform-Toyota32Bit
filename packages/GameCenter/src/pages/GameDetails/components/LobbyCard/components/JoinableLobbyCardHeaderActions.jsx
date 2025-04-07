import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const JoinableLobbyCardHeaderActions = ({ copyLobbyCodeToClipboard, lobbyCode, lobby }) => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  return (
    <View style={styles.cardHeaderActions}>
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={() => copyLobbyCodeToClipboard(lobbyCode)}
      >
        <Icon name="code-tags" size={TABLET_DEVICE ? 20 : 16} color={colors.subText} />
        <Text style={[styles.lobbyCode, { color: colors.text }]}>{lobbyCode}</Text>
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        {lobby.hasPassword && (
          <Icon name="lock" size={TABLET_DEVICE ? 24 : 20} color={colors.text} style={styles.headerIcon} />
        )}
        {lobby.gameStarted && (
          <View style={styles.gameStartedContainer}>
            <Icon name="run-fast" size={TABLET_DEVICE ? 24 : 20} color="#FF6F61" style={styles.headerIcon} />
            <Text style={[styles.gameStartedText, { color: colors.error }]}>
              {t('gameDetailsScreen.started')}
              </Text> 
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  cardHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lobbyCode: {
    marginLeft: 5,
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 14 : 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 10,
  },
  gameStartedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  gameStartedText: {
    marginLeft: 5,
    color: '#FF6F61',
    fontFamily: 'Orbitron-ExtraBold',
  }
});

export default JoinableLobbyCardHeaderActions;