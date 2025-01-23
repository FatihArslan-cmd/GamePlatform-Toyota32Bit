import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, IconButton, Surface } from 'react-native-paper';
import { styles } from '../../styles';
import axios from 'axios';
import { getToken } from '../../../../../../shared/states/api';

export default function AboutTab({ about }) {
  const [userLobby, setUserLobby] = useState(null);
  const formattedAbout = Array.isArray(about) ? about : [about];
  const userId = 1; // Şimdilik sabit bir kullanıcı ID kullanıyoruz. Gerçekte bunu kullanıcı oturumundan almanız gerekir.

  useEffect(() => {
    const fetchLobbies = async () => {
      const token = getToken();
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/lobby/list', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          if (response.data && response.data.lobbies) {
            const ownerLobby = response.data.lobbies.find((lobby) => lobby.ownerId === userId);
            setUserLobby(ownerLobby);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Lobby verisi çekilirken hata oluştu:', error);
      }
    };

    fetchLobbies();
  }, []);

  return (
    <View style={[styles.aboutContainer, { paddingBottom: 80 }]}>
      <View style={styles.instructionWrapper}>
        {formattedAbout.map((item, index) => (
          <Surface key={index} style={styles.modernInstructionItem} elevation={2}>
            <Text style={styles.modernInstructionText}>{item}</Text>
          </Surface>
        ))}
      </View>

      {userLobby && (
        <Card style={styles.lobbyCard}>
          <Card.Content style={styles.lobbyContent}>
            <View style={styles.lobbyHeader}>
              <Title style={styles.lobbyName}>{userLobby.lobbyName}</Title>
            </View>
            <View style={styles.lobbyInfo}>
              <View style={styles.lobbyInfoItem}>
                <IconButton icon="crown" size={20} color="#4a148c" />
                <Text style={styles.lobbyInfoText}>{userLobby.ownerId}</Text>
              </View>
              <View style={styles.lobbyInfoItem}>
                <IconButton icon="account" size={20} color="#4a148c" />
                <Text style={styles.lobbyInfoText}>
                  {userLobby.members ? userLobby.members.length : 0}/{userLobby.maxCapacity}
                </Text>
              </View>
            </View>

          </Card.Content>
        </Card>
      )}

      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.startGameButton}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        icon="gamepad-variant"
      >
        Start Game
      </Button>
    </View>
  );
}