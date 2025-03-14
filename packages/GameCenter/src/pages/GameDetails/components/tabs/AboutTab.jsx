import React from 'react';
import { View, Text } from 'react-native'; // Import Alert
import { Button, Surface } from 'react-native-paper';
import { styles } from '../../styles';
import ActiveLobbiesContent from '../../../HomeScreen/components/Header/components/ActiveLobbiesContent';
import lobbyService from '../../service/service';
import { ToastService } from '../../../../context/ToastService';

export default function AboutTab({ about }) { // Removed currentLobby prop
  const formattedAbout = Array.isArray(about) ? about : [about];

  const handleStartGame = async () => {
    try {
      await lobbyService.startGame();
      // Optionally handle success here, e.g., navigate to the game screen
    } catch (error) {
      let errorMessage = "Failed to start the game. Please try again."; // Default generic message
      if (error instanceof Error) {
        errorMessage = error.message; // Use the specific error message from service
      }
      ToastService.show("error", errorMessage); // Show specific or generic error
    }
  };

  return (
    <View style={[styles.aboutContainer, { paddingBottom: 80 }]}>
      <View style={styles.instructionWrapper}>
        {formattedAbout.map((item, index) => (
          <Surface key={index} style={styles.modernInstructionItem} elevation={2}>
            <Text style={styles.modernInstructionText}>{item}</Text>
          </Surface>
        ))}
      </View>
     <ActiveLobbiesContent showNoLobby = {false}  />
       <Button
        mode="contained"
        onPress={handleStartGame}
        style={styles.startGameButton} // Style is already absolute and bottom 0
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        icon="gamepad-variant"
      >
        Start Game
      </Button>
    </View>
  );
}