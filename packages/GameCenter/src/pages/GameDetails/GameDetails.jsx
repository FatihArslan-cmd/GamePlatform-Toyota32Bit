import React from 'react';
import { useRoute } from '@react-navigation/native';
import GameDetailsLayout from './components/GameDetailsLayout';
import { GameDetailsProvider } from './context/GameDetailsContext';

export default function GameDetails() {
  const route = useRoute();
  const { gameName, explanation, imageSource,backgroundColors } = route.params;

  return (
    <GameDetailsProvider>
      <GameDetailsLayout 
        gameName={gameName}
        explanation={explanation}
        imageSource={imageSource}
        backgroundColors={backgroundColors}
      />
    </GameDetailsProvider>
  );
}
