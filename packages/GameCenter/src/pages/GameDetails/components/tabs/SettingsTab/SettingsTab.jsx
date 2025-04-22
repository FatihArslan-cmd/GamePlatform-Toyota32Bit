import FadeIn from "../../../../../components/Animations/FadeInAnimation";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { ToastService } from "../../../../../context/ToastService";
import { useGameDetails } from "../../../context/GameDetailsContext";
import { RadioGroupSetting } from "./components/RadioGroupSetting";
import { SwitchSetting } from "./components/SwitchSetting";
import { VolumeControl } from "./components/VolumeControl";

export default function SettingsTab() {
  const { gameSettings, setGameSettings } = useGameDetails();
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 
  const { t } = useTranslation();

  const handleSettingChange = (key, value) => {
    setGameSettings({ ...gameSettings, [key]: value });
    if (key === 'gameSpeed') {
      ToastService.show('info', t('gameDetailsScreen.gameSpeedInfo'));
    }
  };
  const speedOptions = [
    { label: t('gameDetailsScreen.slow'), value: 'Slow' },
    { label: t('gameDetailsScreen.normal'), value: 'Normal' },
    { label: t('gameDetailsScreen.fast'), value: 'Fast' }
  ];
  return (
    <FadeIn>
      <View style={styles.settingsContainer}>
        <Card style={styles.settingsCard} theme={{ colors: { card: colors.background} }}> 
          <Card.Content>
            <SwitchSetting
              label={t('gameDetailsScreen.animated')}
              value={gameSettings.animatedPlay}
              onChange={(value) => handleSettingChange('animatedPlay', value)}
              labelColor={colors.text} 
              thumbColor={colors.primary} 
              trackColor={{ true: colors.primary, false: colors.border }}
            />
            <SwitchSetting
              label={t('gameDetailsScreen.numberreadSound')}
              value={gameSettings.voiceCalloutEnabled}
              onChange={(value) => handleSettingChange('voiceCalloutEnabled', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
            <SwitchSetting
              label={t('gameDetailsScreen.sound')}
              value={gameSettings.sound}
              onChange={(value) => handleSettingChange('sound', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
            <SwitchSetting
              label={t('gameDetailsScreen.otomaticMarking')}
              value={gameSettings.autoDaub}
              onChange={(value) => handleSettingChange('autoDaub', value)}
              labelColor={colors.text}
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
                <RadioGroupSetting
              label={t('gameDetailsScreen.gameSpeed')}
              value={gameSettings.gameSpeed || 'Normal'}
              onChange={(value) => handleSettingChange('gameSpeed', value)}
              options={speedOptions}
              labelColor={colors.text}
              activeColor={colors.primary}
              uncheckedColor={colors.subText}
            />
            <VolumeControl
              label={t('gameDetailsScreen.soundLevel')}
              value={gameSettings.soundEffectsVolume}
              onChange={(value) => handleSettingChange('soundEffectsVolume', value)}
              labelColor={colors.text} 
              thumbColor={colors.primary}
              trackColor={{ true: colors.primary, false: colors.border }} 
              iconColor={colors.primary} 
            />
          </Card.Content>
        </Card>
      </View>
    </FadeIn>
  );
}

const createStyles = (colors) => StyleSheet.create({
  settingsContainer: {
    padding: 15,
  },
  settingsCard: {
    backgroundColor: colors.card, 
    borderRadius: 20,
  },
});