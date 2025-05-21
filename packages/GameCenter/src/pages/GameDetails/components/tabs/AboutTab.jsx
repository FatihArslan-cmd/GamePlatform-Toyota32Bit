import ActiveLobbiesContent from "../../../HomeScreen/components/Header/components/ActiveLobbiesContent";
import React, { useState } from "react";
import lobbyService from "../../service/service";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { ToastService } from "../../../../context/ToastService";
import { styles } from "../../styles";

export default function AboutTab({ explanation, textColor , about}) {
  const formattedExplanation = Array.isArray(explanation) ? explanation : [explanation];
  const { colors } = useTheme();
  const [isStartingGame, setIsStartingGame] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleStartGame = async () => {
    if (!explanation) {
      navigation.navigate('FallPanicScreen');
      return;
    }

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

      {about ? (
        <Surface style={[styles.modernInstructionItem, { backgroundColor: colors.card, marginBottom: 20 }]} elevation={2}>
           <Text style={[styles.modernInstructionText, { color: colors.text }]}>
             {about}
           </Text>
        </Surface>
      ) : null}

      {explanation ? (
        <View style={styles.instructionWrapper}>
          {formattedExplanation.map((item, index) => (
            <Surface key={index} style={[styles.modernInstructionItem,{backgroundColor:colors.card}]} elevation={2}>
              <Text style={[styles.modernInstructionText,{color:colors.text}]}>{item}</Text>
            </Surface>
          ))}
        </View>
      ) : null}

      {explanation ? (
         <ActiveLobbiesContent showNoLobby = {false}  />
      ) : null }

       <Button
        mode="contained"
        onPress={handleStartGame}
        style={[styles.startGameButton, { backgroundColor: textColor }]}
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