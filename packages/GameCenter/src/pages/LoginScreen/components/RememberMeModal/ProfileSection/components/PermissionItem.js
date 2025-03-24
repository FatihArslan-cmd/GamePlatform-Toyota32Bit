import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Checkbox, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../../../context/ThemeContext';

const PermissionItem = ({ title, icon, permission, isChecked, onToggle }) => {
  const { colors } = useTheme(); 

  return (
    <Surface style={[styles.permissionItem, { backgroundColor: colors.card }]}> 
      <View style={styles.permissionContent}>
        <Icon name={icon} size={24} color={colors.primary} style={styles.icon} /> 
        <Text style={[styles.permissionText, { color: colors.text }]}>{title}</Text> 
      </View>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => onToggle(permission)}
        color={colors.primary} 
        uncheckedColor={colors.subText} 
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  permissionItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
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
    flex: 1,
    fontFamily:'Orbitron-ExtraBold'
  },
});

export default PermissionItem;