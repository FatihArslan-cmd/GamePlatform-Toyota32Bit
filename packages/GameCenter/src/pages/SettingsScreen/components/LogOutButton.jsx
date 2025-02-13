import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import CustomModal from '../../../components/CustomModal';
import { UserContext } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = ({ showText = true, showChevron = true }) => { // Added showChevron prop with default value true
  const [isModalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      <List.Item
        title={showText ? "Logout" : null}
        titleStyle={{ fontFamily: 'Orbitron-ExtraBold' }}
        left={props => <List.Icon {...props} color="#B22222" icon="logout" />}
        right={props => showChevron ? <List.Icon {...props} color="#B22222" icon="chevron-right" /> : null} // Conditionally render chevron based on showChevron
        onPress={() => setModalVisible(true)}
      />

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Logout"
        text="Are you sure you want to log out?"
        showConfirmButton="true"
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default LogoutButton;