import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatDate from '../../../../../../utils/FormatDate';
import { useTheme } from '../../../../../../context/ThemeContext'; 
import {useTranslation} from 'react-i18next';
const LobbyDetails = ({ lobby }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.lobbyDetails}>
      <View style={styles.typeBadgeContainer}>
        <View style={styles.typeBadge}>
          <Icon name="tag" size={16} color={colors.text} /> 
          <Text style={[styles.lobbyType, { color: colors.text }]}>{lobby.lobbyType.toUpperCase()}</Text> 
        </View>
        {lobby.lobbyType === 'Event' && (
          <View style={styles.eventDateContainer}>
            <View style={styles.dateItem}>
              <Icon name="calendar-start" size={16} color={colors.info} /> 
              <Text style={[styles.dateText, { color: colors.text }]}>{formatDate(lobby.startDate, true)}</Text> 
            </View>
            <View style={styles.dateItem}>
              <Icon name="calendar-end" size={16} color={colors.error} /> 
              <Text style={[styles.dateText, { color: colors.text }]}>{formatDate(lobby.endDate, true)}</Text> 
            </View>
          </View>
        )}
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailHeader}>
          <Icon name="crown" size={20} color={colors.warning} /> 
          <Text style={[styles.detailLabel, { color: colors.text }]}>
            {t('homeScreen.owner')}
          </Text>
        </View>
        <Text style={[styles.detailLabel, { color: colors.text }]}>{lobby.ownerUsername.toUpperCase()}</Text> 
      </View>
      <View style={styles.detailItem}>
        <View style={styles.detailHeader}>
          <Icon name="account-group" size={20} color={colors.primary} /> 
          <Text style={[styles.detailLabel, { color: colors.text }]}>
            {t('homeScreen.players')}
          </Text>
        </View>
        <Text style={[styles.detailLabel, { color: colors.text }]}>
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