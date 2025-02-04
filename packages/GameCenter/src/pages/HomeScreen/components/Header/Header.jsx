import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import GradientText from '../../../../components/GrandientText';
import SearchBar from './SearchBar';
import MenuComponent from './MenuComponent';
import CreateLobbyModal from '../CreateLobbyModal/CreateLobbyModal';
import BottomSheet from '../../../../components/BottomSheet';
import ActiveLobbiesContent from './ActiveLobbiesContent';
import JoinLobbyModal from './JoinLobbyModal';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [joinLobbyModalVisible, setJoinLobbyModalVisible] = useState(false); // Yeni state

  const openMenu = () => setTimeout(() => setMenuVisible(true), 100);
  const closeMenu = () => setMenuVisible(false);
  
  const openBottomSheet = () => setIsBottomSheetVisible(true);
  const closeBottomSheet = () => setIsBottomSheetVisible(false);

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <SearchBar
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!searchMode && (
          <>
            <GradientText
              text="Game Center"
              colors={['#4A00E0', '#FF8C00']}
              textStyle={{ fontSize: 28 }}
              gradientDirection="horizontal"
            />
            <View style={styles.rightActions}>
              <MenuComponent
                menuVisible={menuVisible}
                openMenu={openMenu}
                closeMenu={closeMenu}
                setLobbyModalVisible={setLobbyModalVisible}
                openBottomSheet={openBottomSheet} // openBottomSheet prop olarak geçirildi
                setJoinLobbyModalVisible={setJoinLobbyModalVisible} //join lobby modalını açmak için
              />
            </View>
          </>
        )}
      </Appbar.Header>
      <CreateLobbyModal
        visible={lobbyModalVisible}
        onDismiss={() => setLobbyModalVisible(false)}
        height="50%"
      />
      <BottomSheet
        visible={isBottomSheetVisible}
        onDismiss={closeBottomSheet}
        title="Active Lobbies"
        height="50%"
      >
        <ActiveLobbiesContent />
      </BottomSheet>
      <JoinLobbyModal // Join Lobby modalını ekle
        visible={joinLobbyModalVisible}
        onDismiss={() => setJoinLobbyModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;