import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Button } from 'react-native-paper';
import PermissionItem from './PermissionItem';

const BioModalContent = ({ onPermissionsChange }) => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false,
  });

  const handlePermissionChange = (permission) => {
    const newPermissions = {
      ...permissions,
      [permission]: !permissions[permission],
    };
    setPermissions(newPermissions);
    onPermissionsChange?.(newPermissions);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Permissions</Title>

      <PermissionItem
        title="Allow Touch ID / Face ID usage"
        icon="fingerprint"
        permission="biometric"
        isChecked={permissions.biometric}
        onToggle={handlePermissionChange}
      />

      <PermissionItem
        title="Allow NFC usage"
        icon="nfc"
        permission="nfc"
        isChecked={permissions.nfc}
        onToggle={handlePermissionChange}
      />

      <PermissionItem
        title="Allow barcode scanner usage"
        icon="barcode-scan"
        permission="barcode"
        isChecked={permissions.barcode}
        onToggle={handlePermissionChange}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  loginButton: {
    backgroundColor: '#8a2be2',
    paddingVertical: 8,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default BioModalContent;
