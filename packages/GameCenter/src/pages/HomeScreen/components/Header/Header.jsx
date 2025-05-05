import ActiveLobbiesContent from "./components/ActiveLobbiesContent";
import AddFriendToLobbyIcon from "./components/components/AddFriendToLobbyIcon";
import BottomSheet from "../../../../components/BottomSheet";
import CreateLobbyModal from "../CreateLobbyModal/CreateLobbyModal";
import GradientText from "../../../../components/GrandientText";
import JoinLobbyModal from "./components/JoinLobbyModal";
import MenuComponent from "./MenuComponent";
import MessageIconWithBadge from "./MessageIconWithBadge";
import React from "react";
import SearchBar from "./SearchBar";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { HeaderProvider, useHeader } from "./context/HeaderContext";

const TABLET_DEVICE = isTablet(); 

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
            textStyle={{ fontSize: TABLET_DEVICE ? 28 : 20 }}
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