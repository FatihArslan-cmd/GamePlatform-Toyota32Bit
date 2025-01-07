import React from 'react';
import { ScrollView } from 'react-native';
import { useGameDetails } from '../context/GameDetailsContext';
import AboutTab from './tabs/AboutTab';
import LobbiesTab from './tabs/LobbiesTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab';
import { styles } from '../styles';

export default function TabContent({ about }) {
  const { activeTab } = useGameDetails();

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab about={about} />;
      case 'lobbies':
        return <LobbiesTab />;
      case 'history':
        return <HistoryTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.tabContent}>
      {renderContent()}
    </ScrollView>
  );
}