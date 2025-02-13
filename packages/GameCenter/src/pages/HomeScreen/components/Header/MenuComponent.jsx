import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu, Divider, Appbar ,Tooltip} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MenuComponent = ({ menuVisible, openMenu, closeMenu, setLobbyModalVisible, openBottomSheet, setJoinLobbyModalVisible }) => { // openBottomSheet prop olarak alındı, setJoinLobbyModalVisible eklendi
  const navigation = useNavigation();

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Tooltip title="Options">
        <Appbar.Action
          icon="dots-vertical"
          onPress={openMenu}
          color="gray"
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
        onPress={() => {}}
        title="Help & Display"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setLobbyModalVisible(true);
        }}
        title="Create Lobby"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          openBottomSheet(); // bottom sheet'i aç
        }}
        title="Active Lobbies"
        titleStyle={styles.menuItemText}
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setJoinLobbyModalVisible(true);
        }}
        title="Join Lobby"
        titleStyle={styles.menuItemText}
      />
    </Menu>
  );
};

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