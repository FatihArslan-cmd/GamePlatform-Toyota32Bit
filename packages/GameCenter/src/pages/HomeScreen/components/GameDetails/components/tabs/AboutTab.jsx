import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, IconButton, Surface } from 'react-native-paper';
import { styles } from '../../styles';

export default function AboutTab({ about }) {
  const formattedAbout = Array.isArray(about) ? about : [about];

  return (
    <View style={[styles.aboutContainer, { paddingBottom: 80 }]}>
      <View style={styles.instructionWrapper}>
        {formattedAbout.map((item, index) => (
          <Surface key={index} style={styles.modernInstructionItem} elevation={2}>
            <Text style={styles.modernInstructionText}>{item}</Text>
          </Surface>
        ))}
      </View>

      <Card style={styles.lobbyCard}>
        <Card.Content style={styles.lobbyContent}>
          <View style={styles.lobbyHeader}>
            <Title style={styles.lobbyName}>Your Lobby</Title>
          </View>
          <View style={styles.lobbyInfo}>
            <View style={styles.lobbyInfoItem}>
              <IconButton icon="crown" size={20} color="#4a148c" />
              <Text style={styles.lobbyInfoText}>123</Text>
            </View>
            <View style={styles.lobbyInfoItem}>
              <IconButton icon="account" size={20} color="#4a148c" />
              <Text style={styles.lobbyInfoText}>2/3</Text>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={() => {
              /* Handle join lobby */
            }}
            style={styles.joinButton}
          >
            Join
          </Button>
        </Card.Content>
      </Card>

      {/* Start Game Button */}
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
