import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import WavyLine from '../../../../components/WavyLine';
import GradientText from '../../../../components/GrandientText';
import SearchBar from './SearchBar';
import MenuComponent from './MenuComponent';
import CreateLobbyModal from '../CreateLobbyModal/CreateLobbyModal';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
            <WavyLine color="#4A00E0" width={200} height={30} />
            <GradientText
              text="Game Center"
              colors={['#4A00E0', '#FF8C00']}
              textStyle={{ fontSize: 28 }}
              gradientDirection="horizontal"
            />
            <WavyLine color="#FF8C00" width={200} height={30} />
            <View style={styles.rightActions}>
              <MenuComponent
                menuVisible={menuVisible}
                openMenu={openMenu}
                closeMenu={closeMenu}
                setLobbyModalVisible={setLobbyModalVisible}
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
