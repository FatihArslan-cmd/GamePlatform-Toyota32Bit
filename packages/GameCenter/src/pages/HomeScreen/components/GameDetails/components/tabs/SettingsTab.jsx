import React from 'react';
import { View } from 'react-native';
import { Card, Text, Switch, IconButton } from 'react-native-paper';
import { useGameDetails } from '../../context/GameDetailsContext';
import { styles } from '../../styles';

export default function SettingsTab() {
  const { gameSettings, setGameSettings } = useGameDetails();

  return (
    <View style={styles.settingsContainer}>
      <Card style={styles.settingsCard}>
        <Card.Content>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Voice Chat</Text>
            <Switch
              value={gameSettings.voiceChat}
              onValueChange={(value) => 
                setGameSettings({ ...gameSettings, voiceChat: value })}
              color="#4a148c"
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Max Players: {gameSettings.maxPlayers}</Text>
            <View style={styles.settingControls}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => setGameSettings(prev => ({
                  ...prev,
                  maxPlayers: Math.max(2, prev.maxPlayers - 1)
                }))}
              />
              <Text style={styles.settingValue}>{gameSettings.maxPlayers}</Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => setGameSettings(prev => ({
                  ...prev,
                  maxPlayers: Math.min(8, prev.maxPlayers + 1)
                }))}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}