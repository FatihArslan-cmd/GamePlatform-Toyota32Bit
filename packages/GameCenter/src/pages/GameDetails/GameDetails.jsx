import GameDetailsLayout from "./components/GameDetailsLayout";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { GameDetailsProvider } from "./context/GameDetailsContext";

export default function GameDetails() {
  const route = useRoute();
  const { gameName,explanation, imageSource,backgroundColors,textColor,about } = route.params;

  return (
    <GameDetailsProvider>
      <GameDetailsLayout 
        gameName={gameName}
        explanation={explanation}
        imageSource={imageSource}
        backgroundColors={backgroundColors}
        textColor={textColor}
        about={about}
      />
    </GameDetailsProvider>
  );
}
