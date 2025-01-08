import React from 'react';
import { useRoute } from '@react-navigation/native';
import GameDetailsLayout from './components/GameDetailsLayout';
import { GameDetailsProvider } from './context/GameDetailsContext';

export default function GameDetails() {
  const route = useRoute();
  const { gameName, about, imageSource } = route.params;

  return (
    <GameDetailsProvider>
      <GameDetailsLayout 
        gameName={gameName}
        about={about}
        imageSource={imageSource}
      />
    </GameDetailsProvider>
  );
}
