import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Menu, Divider, Appbar ,Tooltip} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ToastService } from '../../../../context/ToastService';
import { useTheme } from '../../../../context/ThemeContext';
import { useHeader } from './context/HeaderContext'; 

const MenuComponent = () => { 
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { closeMenu, openLobbyModal, openBottomSheet, openJoinLobbyModal, menuVisible,openMenu } = useHeader(); 

  const handleHelpAndDisplay = () => {
    closeMenu();
    const recipientEmail = 'fatiharslan1459@gmail.com';
    const subject = 'Help & Display Inquiry';
    const body = 'Dear Support Team,\n\nI am writing to you regarding...\n';

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl)
      .catch((err) => {
        ToastService.show('error', 'Failed to open email client');
      });
  };

  return (
    <Menu
      visible={menuVisible} 
      onDismiss={closeMenu}
      mode='elevated'
      anchor={
        <Tooltip title="Options">
        <Appbar.Action
          icon="dots-vertical"
          onPress={openMenu} 
          color={colors.text}
        />
        </Tooltip>
      }
      style={styles.menu}
    >
      <Menu.Item
        onPress={() => {
          closeMenu(); 
          navigation.navigate('Settings');
        }}
        title="Settings"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={handleHelpAndDisplay}
        title="Help & Display"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu(); 
          openLobbyModal();
        }}
        title="Create Lobby"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu(); 
          openBottomSheet();
        }}
        title="Active Lobbies"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu(); 
          openJoinLobbyModal();
        }}
        title="Join Lobby"
        titleStyle={styles.menuItemText}
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
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default MenuComponent;