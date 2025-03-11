import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import PermissionItem from './PermissionItem';
import { storage } from '../../../../../../utils/storage';
import { usePermissionsContext } from '../../../../context/PermissionContext';

const PermissionsModalContent = () => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false,
  });

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const savedPermissions = await storage.getString('permissions');
        if (savedPermissions) {
          const parsedPermissions = JSON.parse(savedPermissions);
          setPermissions(parsedPermissions);
        }
      } catch (error) {
        console.error('Failed to load permissions from storage', error);
      }
    };

    loadPermissions();
  }, []);

  const handlePermissionChange = (key) => {
    setPermissions(prevPermissions => {
      const updatedPermissions = {
        ...prevPermissions,
        [key]: !prevPermissions[key],
      };
      storage.set('permissions', JSON.stringify(updatedPermissions));
      return updatedPermissions;
    });
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

export default PermissionsModalContent;