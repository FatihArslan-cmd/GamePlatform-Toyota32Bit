import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { useGameDetails } from '../../../context/GameDetailsContext';
import { styles } from '../../../styles';
import FadeIn from '../../../../../../../components/Animations/FadeInAnimation';
import { VolumeControl } from './VolumeControl';
import { RadioGroupSetting } from './RadioGroupSetting';
import { SwitchSetting } from './SwitchSetting';
import { ToastService } from '../../../../../../../context/ToastService';

export default function SettingsTab() {
  const { gameSettings, setGameSettings } = useGameDetails();

  const handleSettingChange = (key, value) => {
    setGameSettings({ ...gameSettings, [key]: value });
    if (key === 'gameSpeed') {
      ToastService.show('info', 'Hatırlatma! Oyun hızını sadece lobi sahibi ayarlar.');
    }
  };

  return (
    <FadeIn>
      <View style={styles.settingsContainer}>
        <Card style={styles.settingsCard}>
          <Card.Content>
            <SwitchSetting
              label="Animasyonlu"
              value={gameSettings.animatedPlay}
              onChange={(value) => handleSettingChange('animatedPlay', value)}
            />

            <SwitchSetting
              label="Ses"
              value={gameSettings.sound}
              onChange={(value) => handleSettingChange('sound', value)}
            />

            <RadioGroupSetting
              label="Oyun Hızı"
              value={gameSettings.gameSpeed || 'Normal'}
              onChange={(value) => handleSettingChange('gameSpeed', value)}
              options={['Yavaş', 'Normal', 'Hızlı']}
            />

            <SwitchSetting
              label="Otomatik İşaretleme"
              value={gameSettings.autoDaub}
              onChange={(value) => handleSettingChange('autoDaub', value)}
            />

            <RadioGroupSetting
              label="Tema"
              value={gameSettings.theme || 'Klasik'}
              onChange={(value) => handleSettingChange('theme', value)}
              options={['Klasik', 'Modern', 'Renkli']}
            />

            <VolumeControl
              label="Ses Efekti Seviyesi"
              value={gameSettings.soundEffectsVolume}
              onChange={(value) => handleSettingChange('soundEffectsVolume', value)}
            />

            <VolumeControl
              label="Müzik Seviyesi"
              value={gameSettings.musicVolume}
              onChange={(value) => handleSettingChange('musicVolume', value)}
            />

            <SwitchSetting
              label="Sayı Okuma Sesi"
              value={gameSettings.voiceCalloutEnabled}
              onChange={(value) => handleSettingChange('voiceCalloutEnabled', value)}
            />
          </Card.Content>
        </Card>
      </View>
    </FadeIn>
  );
}