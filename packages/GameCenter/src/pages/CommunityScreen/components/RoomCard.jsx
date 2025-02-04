import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const RoomCard = ({ room, onJoin, onDelete, onBecomeSupporter, onLeaveSupporter }) => {
    return (
      <Card style={{ margin: 8 }}>
        <Card.Content>
          <Title>{room.name}</Title>
          <Paragraph>Creator ID: {room.creatorId}</Paragraph>
          <Paragraph>Supporters: {room.supporters.join(', ')}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button onPress={() => onJoin(room.id)}>Join</Button>
            <Button onPress={() => onBecomeSupporter(room.id)}>Become Supporter</Button>
            <Button onPress={() => onLeaveSupporter(room.id)}>Leave Supporter</Button>
            {onDelete && <Button onPress={() => onDelete(room.id)}>Delete</Button>}
        </Card.Actions>
      </Card>
    );
  };
  
  export default RoomCard;