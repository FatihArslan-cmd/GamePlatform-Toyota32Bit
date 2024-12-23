import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Checkbox, Surface, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BioModalContent = ({ onPermissionsChange }) => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false
  });

  const handlePermissionChange = (permission) => {
    const newPermissions = {
      ...permissions,
      [permission]: !permissions[permission]
    };
    setPermissions(newPermissions);
    onPermissionsChange?.(newPermissions);
  };

  const PermissionItem = ({ title, icon, permission }) => (
    <Surface style={styles.permissionItem}>
      <View style={styles.permissionContent}>
        <Icon name={icon} size={24} color="#bb86fc" style={styles.icon} />
        <Text style={styles.permissionText}>{title}</Text>
      </View>
      <Checkbox
        status={permissions[permission] ? 'checked' : 'unchecked'}
        onPress={() => handlePermissionChange(permission)}
        color="#bb86fc"
        uncheckedColor="#777"
      />
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>İzinler</Title>
      
      <PermissionItem
        title="Touch ID / Face ID kullanımına izin ver"
        icon="fingerprint"
        permission="biometric"
      />
      
      <PermissionItem
        title="NFC kullanımına izin ver"
        icon="nfc"
        permission="nfc"
      />
      
      <PermissionItem
        title="Barkod okuyucu kullanımına izin ver"
        icon="barcode-scan"
        permission="barcode"
      />

      <Button
        mode="contained"
        onPress={() => onPermissionsChange?.(permissions)}
        style={styles.loginButton}
        labelStyle={styles.buttonLabel}
      >
        İzinleri Kaydet
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212', // Dark background
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff', // White text for the title
  },
  permissionItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#1e1e1e', // Darker surface for items
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
    color: '#e0e0e0', // Light gray text for better contrast
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#8a2be2',
    paddingVertical: 8,
    borderRadius: 30,
    marginVertical:10
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default BioModalContent;
