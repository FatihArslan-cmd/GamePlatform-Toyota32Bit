import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [joinLobbyModalVisible, setJoinLobbyModalVisible] = useState(false);
  const navigation = useNavigation();

 const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openBottomSheet = () => setIsBottomSheetVisible(true);
  const closeBottomSheet = () => setIsBottomSheetVisible(false);
  const openLobbyModal = () => setLobbyModalVisible(true);
  const closeLobbyModal = () => setLobbyModalVisible(false);
  const openJoinLobbyModal = () => setJoinLobbyModalVisible(true);
  const closeJoinLobbyModal = () => setJoinLobbyModalVisible(false);


  const navigateToPersonalMessagePage = () => {
    navigation.navigate('PersonalMessagePage');
  };
  const contextValues = {
    menuVisible,
    setMenuVisible,
    searchMode,
    setSearchMode,
    searchQuery,
    setSearchQuery,
    lobbyModalVisible,
    setLobbyModalVisible,
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    joinLobbyModalVisible,
    setJoinLobbyModalVisible,
    openMenu,
    closeMenu,
    openBottomSheet,
    closeBottomSheet,
    openLobbyModal,
    closeLobbyModal,
    openJoinLobbyModal,
    closeJoinLobbyModal,
    navigateToPersonalMessagePage
  };

  return (
    <HeaderContext.Provider value={contextValues}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  return useContext(HeaderContext);
};