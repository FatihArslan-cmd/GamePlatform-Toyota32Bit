import React, { useEffect, useState } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { storage } from '../../../../../../utils/storage';

const PermissionsIcon = ({ handlePermissionAction }) => {
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

  const iconMap = {
    barcode: { name: 'qr-code-scanner', type: 'barcode' },
    biometric: { name: 'fingerprint', type: 'biometric' },
    nfc: { name: 'nfc', type: 'nfc' },
  };


  return Object.keys(permissions)
    .filter((key) => permissions[key])
    .map((key) => (
      <TouchableOpacity
        key={key}
        style={styles.iconWrapper}
        onPress={() => {
            handlePermissionAction(iconMap[key].type);
    
        }}
      >
        <Icon name={iconMap[key].name} size={80} color="#8a2be2" />
      </TouchableOpacity>
    ));
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginHorizontal: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PermissionsIcon;