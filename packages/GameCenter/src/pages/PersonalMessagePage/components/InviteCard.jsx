import React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { Button, Card, Surface, Text } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { getTimeAgo } from "../../../utils/getTimeAgo";
import { isTablet } from "../../../utils/isTablet";
import { useLobbyInvite } from "../context/LobbyInviteContext";
import { invitationCardStyles } from "../styles/InvitationsPageStyles";

const TABLET_DEVICE = isTablet();

const InviteCard = ({ invite }) => { 
  const { colors } = useTheme();
  const styles = invitationCardStyles(colors);
  const { handleAcceptInvite, handleRejectInvite } = useLobbyInvite();
  const { t } = useTranslation();
  const inviteMessage = `${invite.inviterUsername.toUpperCase()} ${t('personalMessagePage.invitedyoutothe')} ${invite.lobbyName.toUpperCase()} ${t('personalMessagePage.lobby')}`;

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