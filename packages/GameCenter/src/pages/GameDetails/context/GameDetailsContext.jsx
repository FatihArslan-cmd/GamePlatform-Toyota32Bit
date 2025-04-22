import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../../../utils/storage";

const GameDetailsContext = createContext();

const defaultGameSettings = {
  animatedPlay: true,
  voiceCalloutEnabled: true,
  sound: true,
  autoDaub: false,
  gameSpeed: 'Normal',
  soundEffectsVolume: 1,
};

export function GameDetailsProvider({ children }) {
  const [activeTab, setActiveTab] = useState('about');
  const [lobbyModalVisible, setLobbyModalVisible] = useState(false);

  const [gameSettings, setGameSettings] = useState(() => {
    try {
        const savedSettings = storage.getString('gameSettings');
        const initialSettings = savedSettings ? JSON.parse(savedSettings) : defaultGameSettings;
        return initialSettings;
    } catch (error) {
        console.error("Error reading game settings from storage:", error);
        console.log("Falling back to default game settings.");
        return defaultGameSettings;
    }
  });

  useEffect(() => {
    console.log("Game settings changed:", gameSettings);
    try {
        storage.set('gameSettings', JSON.stringify(gameSettings));
    } catch (error) {
        console.error("Error saving game settings to storage:", error);
    }

  }, [gameSettings]); 

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