import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu, Divider, Appbar } from 'react-native-paper';

const MenuComponent = ({ menuVisible, openMenu, closeMenu, setLobbyModalVisible }) => (
  <Menu
    visible={menuVisible}
    onDismiss={closeMenu}
    anchor={
      <Appbar.Action
        icon="dots-vertical"
        onPress={openMenu}
        color="gray"
      />
    }
    style={styles.menu}
  >
    <Menu.Item onPress={() => {}} title="Settings" titleStyle={styles.menuItemText} />
    <Divider />
    <Menu.Item onPress={() => {}} title="Help & Display" titleStyle={styles.menuItemText} />
    <Divider />
    <Menu.Item
      onPress={() => {
        closeMenu();
        setLobbyModalVisible(true);
      }}
      title="Create Lobby"
      titleStyle={styles.menuItemText}
    />
    <Menu.Item onPress={() => {}} title="Active Lobbies" titleStyle={styles.menuItemText} />
  </Menu>
);

const styles = StyleSheet.create({
  menu: {
    marginTop: 40,
  },
  menuItemText: {
    color: 'black',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default MenuComponent;
