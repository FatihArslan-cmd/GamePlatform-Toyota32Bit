import React, { useState, useContext } from 'react';
import { List } from 'react-native-paper';
import CustomModal from '../../../components/CustomModal';
import { UserContext } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';

const LogoutButton = ({ showText = true, showChevron = true }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useContext(UserContext);
  const navigation = useNavigation();
  const { colors } = useTheme();

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
        titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
        left={props => <List.Icon {...props} color={colors.error} icon="logout" />}
        right={props => showChevron ? <List.Icon {...props} color={colors.error} icon="chevron-right" /> : null}
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