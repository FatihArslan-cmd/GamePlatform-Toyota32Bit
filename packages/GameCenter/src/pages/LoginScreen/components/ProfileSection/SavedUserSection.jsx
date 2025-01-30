import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getRefreshToken } from '../../../../shared/states/api';
import { storage } from '../../../../utils/storage';
import UserIcon from './UserIcon';
import PermissionsModal from './PermissionsModal';
import LoadingFullScreen from '../../../../components/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';

const SavedUserSection = () => {
  const refreshToken = getRefreshToken();
  const [permissions, setPermissions] = useState({ barcode: false, biometric: false, nfc: false });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [hasPermissions, setHasPermissions] = useState(false)

  useEffect(() => {
    const storedPermissions = storage.getString('permissions');
    if (storedPermissions) {
      const parsedPermissions = JSON.parse(storedPermissions);
      setPermissions(parsedPermissions);
      const hasAnyPermission = Object.values(parsedPermissions).some(value => value === true);
      setHasPermissions(hasAnyPermission);
    }
  }, []);

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <View style={styles.container}>
      {hasPermissions && (
        <UserIcon onPress={() => setModalVisible(true)}  />
      )}
      <PermissionsModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        permissions={permissions}
        navigation={navigation}
        setIsLoading={setIsLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SavedUserSection;