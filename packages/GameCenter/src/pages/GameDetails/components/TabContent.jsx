import React from 'react';
import { View} from 'react-native';
import { useGameDetails } from '../context/GameDetailsContext';
import AboutTab from './tabs/AboutTab';
import LobbiesTab from './tabs/LobbiesTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab/SettingsTab';
import { styles } from '../styles';
import { useTheme } from '../../../context/ThemeContext'; // Import useTheme

export default function TabContent({ explanation }) {
  const { activeTab } = useGameDetails();
  const { colors } = useTheme();

  const renderContent = () => {
    const shouldRenderTabs = !!explanation; 

    switch (activeTab) {
      case 'about':
        return <AboutTab explanation={explanation} />;
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
    <View style={[styles.tabContent,{ backgroundColor: colors.background }]}>
      {renderContent()}
    </View>
  );
}