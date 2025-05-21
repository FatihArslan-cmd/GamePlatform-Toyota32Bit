import AboutTab from "./tabs/AboutTab";
import HistoryTab from "./tabs/HistoryTab";
import LobbiesTab from "./tabs/LobbiesTab";
import React from "react";
import SettingsTab from "./tabs/SettingsTab/SettingsTab";
import { View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useGameDetails } from "../context/GameDetailsContext";
import { styles } from "../styles";

export default function TabContent({ explanation,textColor ,about}) {
  const { activeTab } = useGameDetails();
  const { colors } = useTheme();

  const renderContent = () => {
    const shouldRenderTabs = !!explanation; 

    switch (activeTab) {
      case 'about':
        return <AboutTab explanation={explanation} textColor={textColor} about={about} />;
      case 'lobbies':
        return shouldRenderTabs ? <LobbiesTab /> : null;
      case 'history':
        return shouldRenderTabs ? <HistoryTab /> : null;
      case 'settings':
        return shouldRenderTabs ? <SettingsTab /> : null;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.tabContent, { backgroundColor: colors.background }]}>
      {renderContent()}
    </View>
  );
}