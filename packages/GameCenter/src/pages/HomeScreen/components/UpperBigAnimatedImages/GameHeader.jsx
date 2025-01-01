import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import getFormattedDate from '../../../../utils/getFormattedDate';

const GameHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.sectionTitle}>Top Rated Games</Text>
    <Text style={styles.dateText}>{getFormattedDate()}</Text>
    <Divider style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 28,
    color: '#1a1a1a',
    letterSpacing: -0.5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  divider: {
    height: 3,
    borderRadius: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default GameHeader;
