import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button, Text } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LobbyDetails from '../../../../HomeScreen/components/Header/components/components/LobbyDetails';
import { useTheme } from '../../../../../context/ThemeContext'; 
import {useTranslation} from 'react-i18next';

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
    fontSize: 14,
  },
  buttonText: {
    color: 'white', 
  },
});

export default JoinableLobbyCardContent;