import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useGameDetails } from '../context/GameDetailsContext';
import { styles } from '../styles';

export default function TabNavigation() {
  const { activeTab, setActiveTab } = useGameDetails();

  return (
    <View style={styles.tabContainer}>
      <Button
        mode={activeTab === 'about' ? 'contained' : 'text'}
        onPress={() => setActiveTab('about')}
        style={styles.tabButton}
        labelStyle={{fontFamily: 'Orbitron-ExtraBold'}}
        icon="information"
      >
        Start
      </Button>
      <Button
        mode={activeTab === 'lobbies' ? 'contained' : 'text'}
        onPress={() => setActiveTab('lobbies')}
        style={styles.tabButton}
        labelStyle={{fontFamily: 'Orbitron-ExtraBold'}}
        icon="account-group"
      >
        Lobbies
      </Button>
      <Button
        mode={activeTab === 'history' ? 'contained' : 'text'}
        onPress={() => setActiveTab('history')}
        style={styles.tabButton}
        labelStyle={{fontFamily: 'Orbitron-ExtraBold'}}
        icon="history"
      >
        History
      </Button>
      <Button
        mode={activeTab === 'settings' ? 'contained' : 'text'}
        onPress={() => setActiveTab('settings')}
        style={styles.tabButton}
        labelStyle={{fontFamily: 'Orbitron-ExtraBold'}}
        icon="cog"
      >
        Settings
      </Button>
    </View>
  );
}