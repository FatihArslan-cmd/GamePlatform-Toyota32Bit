import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import CustomModal from '../../../components/CustomModal';
import { UserContext } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useContext(UserContext);
  const navigation = useNavigation(); // Get navigation here

  const handleLogout = () => {
    logoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.logoutButton}
      >
        Logout
      </Button>

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Logout"
        text="Are you sure you want to log out?"
        showConfirmButton="false"
        onConfirm={handleLogout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default LogoutButton;