import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/CustomModal';
import { removeToken } from '../../shared/states/api';
import BackButton from '../../components/BackIcon';
import { storage } from '../../utils/storage';
const SettingScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const getToken = () => {
    const token = storage.getString('token'); // MMKV'den token alınıyor
    console.log('Token1:', token);
    if (!token) {
      console.warn('No token found in storage');
    }
    console.log('Token2:', token);
    return token;
  };
  
  const handleLogout = () => {
    getToken();
    removeToken(); // Delete the token
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <BackButton size={32} color='white' />
      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.logoutButton}>
        Logout
      </Button>

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Logout"
        text="Are you sure you want to log out?"
        showConfirmButton="false"
        onConfirm={handleLogout}
      >
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logoutButton: {
    backgroundColor: '#8a2be2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#8a2be2',
  },
  cancelButton: {
    borderColor: '#8a2be2',
    borderWidth: 1,
  },
});

export default SettingScreen;
