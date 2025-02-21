import React from 'react';
import { View,Image } from 'react-native';
import { Card, Text, Button, Surface } from 'react-native-paper';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { invitationCardStyles } from '../styles/InvitationsPageStyles'; // Import styles specific to InviteCard

const InviteCard = ({ invite, onAccept, onReject }) => {
  const inviteMessage = `${invite.inviterUsername.toUpperCase()} seni ${invite.lobbyName.toUpperCase()} lobisine davet etti`;

  return (
    <Surface style={invitationCardStyles.surfaceCard} elevation={4}>
      <Card style={invitationCardStyles.card}>
        <View style={invitationCardStyles.cardHeader}>
          <View style={invitationCardStyles.headerInfo}>
            <Image source={{ uri: invite.inviterProfilePhoto }} style={invitationCardStyles.inviterAvatar} />
            <Text style={invitationCardStyles.inviteMessage}>{inviteMessage}</Text>
            <Text style={invitationCardStyles.timestamp}>{getTimeAgo(invite.timestamp)}</Text>
          </View>
        </View>

        <Card.Actions style={invitationCardStyles.actions}>
          <Button
            mode="contained"
            onPress={() => onAccept(invite.lobbyCode)}
            style={invitationCardStyles.acceptButton}
            contentStyle={invitationCardStyles.buttonContent}
            labelStyle={invitationCardStyles.buttonLabel}
          >
            Kabul Et
          </Button>
          <Button
            mode="outlined"
            onPress={() => onReject(invite.lobbyCode)}
            style={invitationCardStyles.rejectButton}
            contentStyle={invitationCardStyles.buttonContent}
            labelStyle={invitationCardStyles.buttonLabel}
          >
            Reddet
          </Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

export default InviteCard;