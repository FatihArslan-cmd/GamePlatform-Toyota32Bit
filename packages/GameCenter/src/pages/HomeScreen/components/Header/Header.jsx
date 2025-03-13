import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import GradientText from '../../../../components/GrandientText';
import SearchBar from './SearchBar';
import MenuComponent from './MenuComponent';
import CreateLobbyModal from '../CreateLobbyModal/CreateLobbyModal';
import BottomSheet from '../../../../components/BottomSheet';
import ActiveLobbiesContent from './components/ActiveLobbiesContent';
import JoinLobbyModal from './components/JoinLobbyModal';
import MessageIconWithBadge from './MessageIconWithBadge';
import AddFriendToLobbyIcon from './components/components/AddFriendToLobbyIcon';
import { useTheme } from '../../../../context/ThemeContext';
import { HeaderProvider, useHeader } from './context/HeaderContext';
import { CreateLobbyProvider } from '../CreateLobbyModal/context/CreateLobbyContext';

const HeaderContent = () => {
  const { colors } = useTheme();
  const {
    lobbyModalVisible,
    closeLobbyModal,
    isBottomSheetVisible,
    closeBottomSheet,
    navigateToFriendInvite,
    navigateToUpdateLobby,
  } = useHeader(); 

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
        <SearchBar/>

        <>
          <GradientText
            text="Game Center"
            colors={colors.gameCenterText}
            textStyle={{ fontSize: 28 }}
            gradientDirection="horizontal"
          />
          <View style={styles.rightActions}>
            <MessageIconWithBadge/>
            <MenuComponent />
          </View>
        </>

      </Appbar.Header>

      <CreateLobbyModal
        visible={lobbyModalVisible}
        onDismiss={closeLobbyModal}
        height="50%"
      />
      <BottomSheet
        visible={isBottomSheetVisible}
        onDismiss={closeBottomSheet}
        title="Active Lobbies"
        height="50%"
      >
        <AddFriendToLobbyIcon
        leftAction={{
          onPress: () => {
            navigateToFriendInvite();
          },
          iconName: 'account-plus',
        }}
          rightAction={{
            onPress: () => {
              navigateToUpdateLobby();
            },
            iconName: 'update',
          }}
        />
        <ActiveLobbiesContent />
      </BottomSheet>
      <JoinLobbyModal/>
    </>
  );
};

const Header = () => {
  return (
    <HeaderProvider>
       <HeaderContent />
    </HeaderProvider>
  );
};

const styles = StyleSheet.create({
  appbar: {
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
  bottomSheetIconTouchable: {
    padding: 5,
  },
});

export default Header;