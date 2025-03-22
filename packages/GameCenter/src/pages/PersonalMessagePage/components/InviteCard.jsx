import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button, Surface } from 'react-native-paper';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { invitationCardStyles } from '../styles/InvitationsPageStyles';
import { useTheme } from '../../../context/ThemeContext';
import { useLobbyInvite } from '../context/LobbyInviteContext';
import { useTranslation } from 'react-i18next'; 

const InviteCard = ({ invite }) => { 
  const inviteMessage = `${invite.inviterUsername.toUpperCase()} ${t('personalMessagePage.invitedyoutothe')} ${invite.lobbyName.toUpperCase()} ${t('personalMessagePage.lobby')}`;
  const { colors } = useTheme();
  const styles = invitationCardStyles(colors);
  const { handleAcceptInvite, handleRejectInvite } = useLobbyInvite();
  const { t } = useTranslation();
  
  return (
    <Surface style={styles.surfaceCard} elevation={4}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerInfo}>
            <Image source={{ uri: invite.inviterProfilePhoto }} style={styles.inviterAvatar} />
            <Text style={styles.inviteMessage}>{inviteMessage}</Text>
            <Text style={styles.timestamp}>{getTimeAgo(invite.timestamp)}</Text>
          </View>
        </View>

        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => handleAcceptInvite(invite.lobbyCode)} 
            style={styles.acceptButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            buttonColor={colors.primary}
            textColor={colors.card}
          >
            {t('personalMessagePage.accept')}
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleRejectInvite(invite.lobbyCode)} 
            style={styles.rejectButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            buttonColor={colors.card}
            textColor={colors.text}
            borderColor={colors.border}
          >
            {t('personalMessagePage.decline')}
          </Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

export default InviteCard;