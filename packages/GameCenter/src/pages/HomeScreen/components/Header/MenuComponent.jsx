import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet } from "react-native";
import { Appbar, Divider, Menu, Tooltip } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { ToastService } from "../../../../context/ToastService";
import { isTablet } from "../../../../utils/isTablet";
import { useHeader } from "./context/HeaderContext";

const TABLET_DEVICE = isTablet();

const MenuComponent = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { closeMenu, openLobbyModal, openBottomSheet, openJoinLobbyModal, menuVisible, openMenu } = useHeader();
  const { t } = useTranslation();

  const handleHelpAndDisplay = () => {
    closeMenu();
    const recipientEmail = 'fatiharslan1459@gmail.com';
    const subject = 'Help & Display Inquiry';
    const body = 'Dear Support Team,\n\nI am writing to you regarding...\n';

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(() => {
      ToastService.show('error', t('homeScreen.emailError'));
    });
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      mode="elevated"
      anchor={
        <Tooltip title={t('homeScreen.options')}>
          <Appbar.Action icon="dots-vertical" size={TABLET_DEVICE ? 24 : 18} onPress={openMenu} color={colors.text} />
        </Tooltip>
      }
      contentStyle={[styles.menu, { backgroundColor: colors.card }]}
    >
      <Menu.Item
        style={styles.menuItemContainer}
        onPress={() => {
          closeMenu();
          navigation.navigate('Settings');
        }}
        title={t('homeScreen.settings')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider style={styles.divider} /> 
      <Menu.Item
        style={styles.menuItemContainer}
        onPress={handleHelpAndDisplay}
        title={t('homeScreen.helpAndDisplay')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider style={styles.divider} />
      <Menu.Item
        style={styles.menuItemContainer}
        onPress={() => {
          closeMenu();
          openLobbyModal();
        }}
        title={t('homeScreen.createLobby')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider style={styles.divider} />
      <Menu.Item
        style={styles.menuItemContainer}
        onPress={() => {
          closeMenu();
          openBottomSheet();
        }}
        title={t('homeScreen.activeLobbies')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider style={styles.divider} />
      <Menu.Item
        style={styles.menuItemContainer}
        onPress={() => {
          closeMenu();
          openJoinLobbyModal();
        }}
        title={t('homeScreen.joinLobby')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    marginTop: 50,
  },
  menuItemContainer: {
    minHeight: 38,
    paddingVertical: 4, 
    justifyContent: 'center', 
  },
  menuItemText: {
    color: 'black',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 13 : 12, 
  },
  divider: {
    marginVertical: 2, 
  },
});

export default MenuComponent;