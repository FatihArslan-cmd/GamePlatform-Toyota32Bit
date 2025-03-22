import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Menu, Divider, Appbar, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ToastService } from '../../../../context/ToastService';
import { useTheme } from '../../../../context/ThemeContext';
import { useHeader } from './context/HeaderContext';
import { useTranslation } from 'react-i18next';

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
          <Appbar.Action icon="dots-vertical" onPress={openMenu} color={colors.text} />
        </Tooltip>
      }
      contentStyle={[styles.menu, { backgroundColor: colors.card }]}
    >
      <Menu.Item
        onPress={() => {
          closeMenu();
          navigation.navigate('Settings');
        }}
        title={t('homeScreen.settings')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider />
      <Menu.Item
        onPress={handleHelpAndDisplay}
        title={t('homeScreen.helpAndDisplay')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          openLobbyModal();
        }}
        title={t('homeScreen.createLobby')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          openBottomSheet();
        }}
        title={t('homeScreen.activeLobbies')}
        titleStyle={[styles.menuItemText, { color: colors.text }]}
      />
      <Divider />
      <Menu.Item
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
    marginTop: 70,
  },
  menuItemText: {
    color: 'black',
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default MenuComponent;
