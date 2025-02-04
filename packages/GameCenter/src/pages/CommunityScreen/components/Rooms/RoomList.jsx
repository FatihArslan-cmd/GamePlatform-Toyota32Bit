import React from 'react';
import { FlatList } from 'react-native';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, onJoin, onDelete, onBecomeSupporter, onLeaveSupporter }) => {
  return (
    <FlatList
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
    />
  );
};

export default RoomList;