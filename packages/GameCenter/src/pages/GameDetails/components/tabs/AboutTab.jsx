import React, { useState } from 'react'; // Import useState
import { View, Text } from 'react-native';
import { Button, Surface } from 'react-native-paper'; // Import ActivityIndicator if you want a loading indicator
import { styles } from '../../styles';
import ActiveLobbiesContent from '../../../HomeScreen/components/Header/components/ActiveLobbiesContent';
import lobbyService from '../../service/service';
import { ToastService } from '../../../../context/ToastService';
import { useTheme } from '../../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

export default function AboutTab({ about }) {
  const formattedAbout = Array.isArray(about) ? about : [about];
  const { colors } = useTheme();
  const [isStartingGame, setIsStartingGame] = useState(false); 
  const { t } = useTranslation();

  const handleStartGame = async () => {
    if (isStartingGame) { 
      return;
    }
    setIsStartingGame(true);
    try {
      await lobbyService.startGame();
    } catch (error) {
      let errorMessage = t('gameDetailsScreen.Failed to start the game. Please try again.');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      ToastService.show("error", errorMessage);
    } finally {
      setIsStartingGame(false); 
    }
  };

  return (
    <View style={[styles.aboutContainer, { paddingBottom: 80 }]}>
      <View style={styles.instructionWrapper}>
        {formattedAbout.map((item, index) => (
          <Surface key={index} style={[styles.modernInstructionItem,{backgroundColor:colors.card}]} elevation={2}>
            <Text style={[styles.modernInstructionText,{color:colors.text}]}>{item}</Text>
          </Surface>
        ))}
      </View>
     <ActiveLobbiesContent showNoLobby = {false}  />
       <Button
        mode="contained"
        onPress={handleStartGame}
        style={styles.startGameButton}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        icon="gamepad-variant"
        loading={isStartingGame} 
        disabled={isStartingGame} 
      >
        {t('gameDetailsScreen.startGame')}
      </Button>
    </View>
  );
}