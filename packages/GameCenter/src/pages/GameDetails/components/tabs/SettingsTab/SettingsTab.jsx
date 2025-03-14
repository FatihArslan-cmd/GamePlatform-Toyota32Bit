import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useGameDetails } from '../../../context/GameDetailsContext';
import FadeIn from '../../../../../components/Animations/FadeInAnimation';
import { VolumeControl } from './components/VolumeControl';
import { RadioGroupSetting } from './components/RadioGroupSetting';
import { SwitchSetting } from './components/SwitchSetting';
import { ToastService } from '../../../../../context/ToastService';
import { useTheme } from '../../../../../context/ThemeContext'; 

export default function SettingsTab() {
  const { gameSettings, setGameSettings } = useGameDetails();
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 

  const handleSettingChange = (key, value) => {
    setGameSettings({ ...gameSettings, [key]: value });
    if (key === 'gameSpeed') {
      ToastService.show('info', 'Hatırlatma! Oyun hızını sadece lobi sahibi ayarlar.');
    }
  };

  return (
    <FadeIn>
      <View style={styles.settingsContainer}>
        <Card style={styles.settingsCard} theme={{ colors: { card: colors.background} }}> 
          <Card.Content>
            <SwitchSetting
              label="Animasyonlu"
              value={gameSettings.animatedPlay}
              onChange={(value) => handleSettingChange('animatedPlay', value)}
              labelColor={colors.text} 
              thumbColor={colors.primary} 
              trackColor={{ true: colors.primary, false: colors.border }}
            />

            <SwitchSetting
              label="Ses"
              value={gameSettings.sound}
              onChange={(value) => handleSettingChange('sound', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />

            <RadioGroupSetting
              label="Oyun Hızı"
              value={gameSettings.gameSpeed || 'Normal'}
              onChange={(value) => handleSettingChange('gameSpeed', value)}
              options={['Yavaş', 'Normal', 'Hızlı']}
              labelColor={colors.text} 
              activeColor={colors.primary} 
              uncheckedColor={colors.subText}
            />

            <SwitchSetting
              label="Otomatik İşaretleme"
              value={gameSettings.autoDaub}
              onChange={(value) => handleSettingChange('autoDaub', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />

            <RadioGroupSetting
              label="Tema"
              value={gameSettings.theme || 'Klasik'}
              onChange={(value) => handleSettingChange('theme', value)}
              options={['Klasik', 'Modern', 'Renkli']}
              labelColor={colors.text}
              activeColor={colors.primary}
              uncheckedColor={colors.subText}
            />

            <VolumeControl
              label="Ses Efekti Seviyesi"
              value={gameSettings.soundEffectsVolume}
              onChange={(value) => handleSettingChange('soundEffectsVolume', value)}
              labelColor={colors.text} 
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }} 
              iconColor={colors.primary} 
            />

            <VolumeControl
              label="Müzik Seviyesi"
              value={gameSettings.musicVolume}
              onChange={(value) => handleSettingChange('musicVolume', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
              iconColor={colors.primary}
            />

            <SwitchSetting
              label="Sayı Okuma Sesi"
              value={gameSettings.voiceCalloutEnabled}
              onChange={(value) => handleSettingChange('voiceCalloutEnabled', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </Card.Content>
        </Card>
      </View>
    </FadeIn>
  );
}

const createStyles = (colors) => StyleSheet.create({
  settingsContainer: {
    padding: 20,
  },
  settingsCard: {
    backgroundColor: colors.card, 
  },
});