import React, { useCallback, useState } from 'react';
import {  StyleSheet } from 'react-native';
import { Appbar, Menu, Divider, TextInput } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import CreateLobbyModal from './CreateLobbyModal/CreateLobbyModal';

const AppBarExample = React.memo(() => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);

  const handleSearchPress = useCallback(() => {
    setSearchMode(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchMode(false);
    setSearchQuery('');
  }, []);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);


  return (
    <>
      <BlurView
        style={styles.blurContainer}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      >
        <Appbar.Header style={styles.appbar}>
          {searchMode ? (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoFocus
                mode="outlined"
                keyboardDismissMode="on-drag"
              />
              <Appbar.Action
                icon="close"
                onPress={handleCloseSearch}
                color="gray"
              />
            </>
          ) : (
            <>
              <Appbar.Action
                icon="magnify"
                onPress={handleSearchPress}
                color="gray"
              />
              <Appbar.Content
                title="GameCenter"
                titleStyle={styles.title}
              />
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
                <Menu.Item onPress={() => {}} title="Settings" titleStyle={styles.title} />
                <Divider />
                <Menu.Item onPress={() => {}} title="Help & Display" titleStyle={styles.title} />
                <Divider />
                <Menu.Item
  onPress={() => {
    closeMenu(); // Close the menu
    setLobbyModalVisible(true); // Open the lobby modal
  }}
  title="Create Lobby"
  titleStyle={styles.title}
/>
<Menu.Item onPress={() => {}} title="Active Lobbies" titleStyle={styles.title} />

              </Menu>
            </>
          )}
        </Appbar.Header>
      </BlurView>
      <CreateLobbyModal
        visible={lobbyModalVisible}
        onDismiss={() => setLobbyModalVisible(false)}
        height="50%"

      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
  },
  menu: {
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: 'white',
  },
});

export default AppBarExample;
