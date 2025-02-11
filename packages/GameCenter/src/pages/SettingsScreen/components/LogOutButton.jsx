import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper'; // Import List
import CustomModal from '../../../components/CustomModal';
import { UserContext } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
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
      {/* Button component is no longer directly rendered */}
      <List.Item
        title="Logout"
        titleStyle={{ fontFamily: 'Orbitron-ExtraBold' }}
        left={props => <List.Icon {...props} color="#B22222" icon="logout" />} // Changed icon and color to match logout purpose
        right={props => <List.Icon {...props} color="#B22222" icon="chevron-right" />} // Added chevron for consistency
        onPress={() => setModalVisible(true)} // Open modal on press
      />

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Logout"
        text="Are you sure you want to log out?"
        showConfirmButton="true" // Changed to true to show confirm and cancel buttons
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)} // Added onCancel to close modal
      />
    </>
  );
};

const styles = StyleSheet.create({
  // logoutButton style is no longer needed as List.Item handles styling
});

export default LogoutButton;