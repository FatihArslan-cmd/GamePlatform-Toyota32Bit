import React, { createContext, useContext, useState } from 'react';

const GameDetailsContext = createContext();

export function GameDetailsProvider({ children }) {
  const [activeTab, setActiveTab] = useState('about');
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
    }}>
      {children}
    </GameDetailsContext.Provider>
  );
}

export const useGameDetails = () => useContext(GameDetailsContext);