import React, { useCallback, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Menu, Divider, TextInput, IconButton } from 'react-native-paper';
import CreateLobbyModal from './CreateLobbyModal/CreateLobbyModal';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import WavyLine from '../../../components/WavyLine';
const Header = React.memo(() => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);
  const searchBarWidth = useSharedValue(0);
  const searchBarOpacity = useSharedValue(0);
  const searchInputRef = useRef(null);

  const handleSearchPress = useCallback(() => {
    setSearchMode(true);
    searchBarWidth.value = withTiming('70%'); // Adjust width as needed
    searchBarOpacity.value = withTiming(1);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [searchBarOpacity, searchBarWidth]);

  const handleCloseSearch = useCallback(() => {
    searchBarWidth.value = withTiming(0);
    searchBarOpacity.value = withTiming(0);
    setSearchQuery('');
    setTimeout(() => setSearchMode(false), 300);
  }, [searchBarOpacity, searchBarWidth]);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      width: searchBarWidth.value,
      opacity: searchBarOpacity.value,
    };
  });

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        {searchMode ? (
          <>
            <IconButton
              icon="arrow-left"
              color="gray"
              size={24}
              onPress={handleCloseSearch}
              style={styles.backButton}
            />
            <Animated.View style={[styles.animatedSearchBar, searchBarStyle]}>
              <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="Search games..."
                value={searchQuery}
                onChangeText={handleSearchChange}
                mode="outlined"
                dense
                autoFocus={false}
                placeholderTextColor="gray"
                outlineStyle={{ borderRadius: 20, borderColor: '#ddd' }}
                contentStyle={{ backgroundColor: '#fff', height: 40 }}
                selectionColor="#007BFF"
              />
            </Animated.View>
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
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
            <WavyLine width={200} height={30} />
           
            <Appbar.Content
              title="GameCenter"
              titleStyle={styles.title}
            />
              <WavyLine width={200} height={30} />

            <View style={styles.rightActions}>
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
            </View>
          </>
        )}
      </Appbar.Header>
      <CreateLobbyModal
        visible={lobbyModalVisible}
        onDismiss={() => setLobbyModalVisible(false)}
        height="50%"
      />
    </>
  );
});

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between', // Default spacing
  },
  title: {
    color: 'black',
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    fontSize: 20,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    marginTop: 40,
  },
  menuItemText: {
    color: 'black',
  },
  animatedSearchBar: {
    height: 40,
    flex: 1, // Take up available space in the center
    marginHorizontal: 10, // Add some horizontal margin
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 16,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0,
  },
  backButton: {
    marginLeft: 0,
  },
});

export default Header;