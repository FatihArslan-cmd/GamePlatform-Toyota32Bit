import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getRefreshToken } from '../../../../../shared/states/api';
import { storage } from '../../../../../utils/storage';
import UserIcon from './components/UserIcon';
import PermissionsModal from './components/PermissionsModal';
import LoadingFullScreen from '../../../../../components/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import { usePermissionsContext } from '../../../context/PermissionContext';

const SavedUserSection = () => {
  const refreshToken = getRefreshToken();
  const navigation = useNavigation();

  const {
    visible: isModalVisible,
    setVisible: setModalVisible, 
    permissions,
    setPermissions,
    hasPermissions,
    setHasPermissions,
    isLoading,
    setIsLoading 
  } = usePermissionsContext();

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
      <PermissionsModal/>
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