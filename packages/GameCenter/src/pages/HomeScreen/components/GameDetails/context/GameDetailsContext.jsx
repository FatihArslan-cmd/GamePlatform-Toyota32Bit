import React, { createContext, useContext, useState } from 'react';

const GameDetailsContext = createContext();

export function GameDetailsProvider({ children }) {
  const [activeTab, setActiveTab] = useState('about');
    const [lobbyModalVisible, setLobbyModalVisible] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    voiceChat: true,
    maxPlayers: 4,
  });

  return (
    <GameDetailsContext.Provider value={{
      activeTab,
      setActiveTab,
      gameSettings,
      setGameSettings,
      lobbyModalVisible,
      setLobbyModalVisible
    }}>
      {children}
    </GameDetailsContext.Provider>
  );
}

export const useGameDetails = () => useContext(GameDetailsContext);