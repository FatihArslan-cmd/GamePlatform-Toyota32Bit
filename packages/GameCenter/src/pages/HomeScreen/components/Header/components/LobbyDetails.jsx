import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatDate from '../../../../../utils/FormatDate';

const LobbyDetails = ({ lobby }) => {
  return (
    <View style={styles.lobbyDetails}>
      <View style={styles.typeBadgeContainer}>
        <View style={styles.typeBadge}>
          <Icon name="tag" size={16} color="#666" />
          <Text style={styles.lobbyType}>{lobby.lobbyType.toUpperCase()}</Text>
        </View>
        {lobby.lobbyType === 'Event' && (
          <View style={styles.eventDateContainer}>
            <View style={styles.dateItem}>
              <Icon name="calendar-start" size={16} color="#007bff" />
              <Text style={styles.dateText}>{formatDate(lobby.startDate, true)}</Text>
            </View>
            <View style={styles.dateItem}>
              <Icon name="calendar-end" size={16} color="#dc3545" />
              <Text style={styles.dateText}>{formatDate(lobby.endDate, true)}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailHeader}>
          <Icon name="crown" size={20} color="#FFD700" />
          <Text style={styles.detailLabel}>Owner</Text>
        </View>
        <Text style={styles.detailLabel}>{lobby.ownerUsername.toUpperCase()}</Text>
      </View>
      <View style={styles.detailItem}>
        <View style={styles.detailHeader}>
          <Icon name="account-group" size={20} color="#4a148c" />
          <Text style={styles.detailLabel}>Players</Text>
        </View>
        <Text style={styles.detailLabel}>
          {lobby.members.length}/{lobby.maxCapacity}
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    lobbyDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    typeBadgeContainer: {
        alignItems: 'center',
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    lobbyType: {
        marginLeft: 5,
        fontFamily: 'Orbitron-VariableFont_wght',
    },
    eventDateContainer: {
        marginTop: 5,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    dateText: {
        marginLeft: 5,
        fontFamily: 'Orbitron-VariableFont_wght',
        fontSize: 12,
    },
    detailItem: {
        alignItems: 'center',
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailLabel: {
        marginLeft: 5,
        fontFamily: 'Orbitron-VariableFont_wght',
    },
});


export default LobbyDetails;