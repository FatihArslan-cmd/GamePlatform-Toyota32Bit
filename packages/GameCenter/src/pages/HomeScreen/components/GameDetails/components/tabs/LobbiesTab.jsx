import React from 'react';
import { View } from 'react-native';
import { Button, Card, Title, Text, Badge, IconButton } from 'react-native-paper';
import { styles } from '../../styles';

const mockLobbies = [
  { id: 1, name: "Pro Players", host: "John's Game", players: 3, maxPlayers: 4, inProgress: false },
  { id: 2, name: "Beginners Welcome", host: "Sarah's Room", players: 2, maxPlayers: 4, inProgress: true },
  { id: 3, name: "Quick Match", host: "Mike's Lobby", players: 1, maxPlayers: 4, inProgress: false },
];

export default function LobbiesTab() {
  return (
    <View style={styles.lobbiesContainer}>
      <Button
        mode="contained"
        icon="plus-circle"
        onPress={() => {/* Handle create lobby */}}
        style={styles.createLobbyButton}
      >
        Create Lobby
      </Button>
      {mockLobbies.map((lobby) => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </View>
  );
}

function LobbyCard({ lobby }) {
  return (
    <Card style={styles.lobbyCard}>
      <Card.Content style={styles.lobbyContent}>
        <View style={styles.lobbyHeader}>
          <Title style={styles.lobbyName}>{lobby.name}</Title>
          {lobby.inProgress && (
            <Badge style={styles.inProgressBadge}>In Progress</Badge>
          )}
        </View>
        <View style={styles.lobbyInfo}>
          <View style={styles.lobbyInfoItem}>
            <IconButton icon="crown" size={20} color="#4a148c" />
            <Text style={styles.lobbyInfoText}>{lobby.host}</Text>
          </View>
          <View style={styles.lobbyInfoItem}>
            <IconButton icon="account" size={20} color="#4a148c" />
            <Text style={styles.lobbyInfoText}>
              {lobby.players}/{lobby.maxPlayers}
            </Text>
          </View>
        </View>
        <Button
          mode="outlined"
          onPress={() => {/* Handle join lobby */}}
          style={styles.joinButton}
          disabled={lobby.inProgress}
        >
          {lobby.inProgress ? 'In Progress' : 'Join'}
        </Button>
      </Card.Content>
    </Card>
  );
}