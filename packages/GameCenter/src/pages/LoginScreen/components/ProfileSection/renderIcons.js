import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PermissionsIcon = ({ permissions, onPermissionSelect }) => {
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
        onPress={() => onPermissionSelect(iconMap[key].type)}
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
