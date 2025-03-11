import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Checkbox, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PermissionItem = ({ title, icon, permission, isChecked, onToggle }) => (
  <Surface style={styles.permissionItem}>
    <View style={styles.permissionContent}>
      <Icon name={icon} size={24} color="#bb86fc" style={styles.icon} />
      <Text style={styles.permissionText}>{title}</Text>
    </View>
    <Checkbox
      status={isChecked ? 'checked' : 'unchecked'}
      onPress={() => onToggle(permission)}
      color="#bb86fc"
      uncheckedColor="#777"
    />
  </Surface>
);

const styles = StyleSheet.create({
  permissionItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  permissionText: {
    fontSize: 16,
    color: '#e0e0e0',
    flex: 1,
    fontFamily:'Orbitron-ExtraBold'
  },
});

export default PermissionItem;