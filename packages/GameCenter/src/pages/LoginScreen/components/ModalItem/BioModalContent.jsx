import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import PermissionItem from './PermissionItem';
import { storage } from '../../../../utils/storage';

const BioModalContent = ({ onPermissionsChange }) => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false,
  });

  useEffect(() => {
    // Load saved permissions from MMKV when the component mounts
    const savedPermissions = storage.getString('permissions');
    if (savedPermissions) {
      setPermissions(JSON.parse(savedPermissions));
    }
  }, []);

    const handlePermissionChange = (key) => {
    // Update the permissions state
    const updatedPermissions = {
      ...permissions,
      [key]: !permissions[key], // Toggle the permission value
    };

    // Save the updated permissions to MMKV
    storage.set('permissions', JSON.stringify(updatedPermissions));

    // Update the state and notify parent component if needed
    setPermissions(updatedPermissions);
    if (onPermissionsChange) {
      onPermissionsChange(updatedPermissions);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Permissions</Title>

      <PermissionItem
        title="Allow Touch ID / Face ID usage"
        icon="fingerprint"
        isChecked={permissions.biometric}
        onToggle={() => handlePermissionChange('biometric')}
        permission="biometric"
      />

      <PermissionItem
        title="Allow NFC usage"
        icon="nfc"
        isChecked={permissions.nfc}
        onToggle={() => handlePermissionChange('nfc')}
        permission="nfc"
      />

      <PermissionItem
        title="Allow barcode scanner usage"
        icon="barcode-scan"
        isChecked={permissions.barcode}
        onToggle={() => handlePermissionChange('barcode')}
        permission="barcode"
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
    fontFamily:'Orbitron-ExtraBold'
  },
});

export default BioModalContent;