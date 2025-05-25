import CustomModal from "../../../components/CustomModal";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { UserContext } from "../../../context/UserContext";
import { removeFcmTokenFromServer } from "../../../utils/Firebase/notificationApi";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const LogoutButton = ({ showText = true, showChevron = true }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useContext(UserContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation(); 


  const handleLogout = () => {
    setModalVisible(false);
    logoutUser();
    removeFcmTokenFromServer();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      <List.Item
        title={showText ? t('settingsScreen.logoutButton.logout') : null} 
        titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text ,fontSize: TABLET_DEVICE ? 18 : 12}}
        left={props => <List.Icon {...props} color={colors.error} icon="logout" />}
        right={props => showChevron ? <List.Icon {...props} color={colors.error} icon="chevron-right" /> : null}
        onPress={() => setModalVisible(true)}
      />

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title={t('settingsScreen.logoutButton.logoutModalTitle')} 
        text={t('settingsScreen.logoutButton.logoutConfirmation')} 
        showConfirmButton="true"
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default LogoutButton;