import PermissionItem from "./PermissionItem";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { storage } from "../../../../../../utils/storage";

const PermissionsModalContent = () => {
  const [permissions, setPermissions] = useState({
    biometric: false,
    nfc: false,
    barcode: false,
  });
  const { colors } = useTheme();
  const { t } = useTranslation();

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>{t('permissionsModal.title')}</Title>

      <PermissionItem
        title={t('permissionsModal.biometric')} 
        icon="fingerprint"
        isChecked={permissions.biometric}
        onToggle={() => handlePermissionChange('biometric')}
        permission="biometric"
      />

      <PermissionItem
        title={t('permissionsModal.nfc')} 
        icon="nfc"
        isChecked={permissions.nfc}
        onToggle={() => handlePermissionChange('nfc')}
        permission="nfc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:'Orbitron-ExtraBold'
  },
});

export default PermissionsModalContent;