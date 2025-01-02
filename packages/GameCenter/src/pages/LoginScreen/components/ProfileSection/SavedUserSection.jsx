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
  const [isLoading, setIsLoading] = useState(false); // Define loading state in parent component
  const [lastUser, setLastUser] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const storedPermissions = storage.getString('permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }

    const storedUser = storage.getString('lastUser');
    if (storedUser) {
      setLastUser(storedUser);
    }
  }, []);

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <View style={styles.container}>
      {refreshToken && (
        <UserIcon onPress={() => setModalVisible(true)} lastUser={lastUser} />
      )}
      <PermissionsModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        permissions={permissions}
        navigation={navigation}
        setIsLoading={setIsLoading} // Pass setIsLoading to PermissionsModal
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
