import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../../../../context/ThemeContext";
import { isTablet } from "../../../../../../utils/isTablet";
import { storage } from "../../../../../../utils/storage";

const TABLET_DEVICE = isTablet();

const PermissionsIcon = ({ handlePermissionAction }) => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false,
  });
  const { colors } = useTheme(); 

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
        <Icon name={iconMap[key].name} size={TABLET_DEVICE ? 80 : 60} color={colors.primary} /> 
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