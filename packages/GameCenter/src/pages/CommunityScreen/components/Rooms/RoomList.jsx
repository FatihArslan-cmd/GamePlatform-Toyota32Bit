import React from 'react';
import { FlashList } from '@shopify/flash-list';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, onJoin, onDelete, onBecomeSupporter, onLeaveSupporter }) => {
  return (
    <FlashList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RoomCard
          room={item}
          onJoin={onJoin}
          onDelete={onDelete}
          onBecomeSupporter={onBecomeSupporter}
          onLeaveSupporter={onLeaveSupporter}
        />
      )}
      estimatedItemSize={150}
    />
  );
};

export default RoomList;