import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LobbyDetails from "../../../../HomeScreen/components/Header/components/components/LobbyDetails";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const JoinableLobbyCardContent = ({ lobby, setJoinModalVisible }) => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();
  return (
    <View>
      <Title style={[styles.lobbyName, { color: colors.text }]}>{lobby.lobbyName}</Title>
      <LobbyDetails lobby={lobby} />
      <View style={[
        styles.actionButtons,
        styles.actionButtonsCenter 
      ]}>
        <Button
          mode="contained"
          onPress={() => setJoinModalVisible(true)}
          style={[styles.joinButton, { backgroundColor: colors.gameDetailsButton }]} 
          labelStyle={[styles.buttonLabel]}
          icon={() => <Icon name="login" size={20} color='white' />}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>
            {t('gameDetailsScreen.join')}
            </Text> 
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-ExtraBold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButtonsCenter: {
    justifyContent: 'center', 
  },
  joinButton: {
    width: '80%', 
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',    
    borderRadius:20
  },
  buttonLabel: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 14 : 11,
  },
  buttonText: {
    color: 'white', 
  },
});

export default JoinableLobbyCardContent;