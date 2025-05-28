import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LobbyDetails from "./LobbyDetails";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { UserContext } from "../../../../../../context/UserContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const LobbyCardContent = ({ lobby, ownerUsername, setLeaveModalVisible, togglePlayerModal }) => {
  const { user } = useContext(UserContext);
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  return (
    <View>
      <Title style={[styles.lobbyName, { color: colors.text }]}>{lobby.lobbyName}</Title> 
      <TouchableOpacity onPress={togglePlayerModal}>
        <LobbyDetails lobby={lobby} />
      </TouchableOpacity>
      <View style={[
        styles.actionButtons,
        !(user && user.username === ownerUsername) && styles.actionButtonsCenter
      ]}>
        <Button
          mode="contained"
          onPress={() => setLeaveModalVisible(true)}
          style={styles.leaveButton} 
          labelStyle={styles.buttonLabel}
        >
          <Icon name="exit-run" size={TABLET_DEVICE ? 20 :14} color="white" />
          <Text style={styles.buttonText}>
             {t('homeScreen.leave')}  
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

  leaveButton: {
    width: '100%', 
    marginBottom: 10, 
    justifyContent: 'center', 
    alignItems: 'center',   
    borderRadius: 20,
    backgroundColor: '#D32F2F', 

  },
  buttonLabel: { 
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 16 : 10,
  },
  buttonText: {
    color: 'white', 
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default LobbyCardContent;