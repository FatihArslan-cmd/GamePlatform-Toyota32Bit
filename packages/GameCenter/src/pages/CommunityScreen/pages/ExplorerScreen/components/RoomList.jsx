import React from 'react';
import { FlashList } from '@shopify/flash-list';
import RoomCard from './RoomCard';
import { useExplorer } from '../context/ExplorerContext';

const RoomList = () => { 
  const { rooms, handleBecomeSupporter } = useExplorer();

  return (
    <FlashList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RoomCard
          room={item}
          onBecomeSupporter={handleBecomeSupporter}
        />
      )}
      estimatedItemSize={150}
    />
  );
};

export default RoomList;