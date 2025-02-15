import React from 'react';
import { View } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { styles } from '../../styles';
import FadeIn from '../../../../../../components/Animations/FadeInAnimation';
const mockHistory = [
  { id: 1, date: "2024-01-05", result: "Won", score: 2500, duration: "15m" },
  { id: 2, date: "2024-01-04", result: "Lost", score: 1800, duration: "12m" },
  { id: 3, date: "2024-01-03", result: "Won", score: 3000, duration: "20m" },
];

export default function HistoryTab() {
  return (
    <FadeIn>
      <View style={styles.historyContainer}>
        {mockHistory.map((game) => (
          <GameHistoryCard key={game.id} game={game} />
        ))}
      </View>
    </FadeIn>
  );
}

function GameHistoryCard({ game }) {
  return (
    <Card style={styles.historyCard}>
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyLeft}>
          <Text style={[
            styles.resultText,
            { color: game.result === 'Won' ? '#4CAF50' : '#F44336' }
          ]}>
            {game.result}
          </Text>
          <Text style={styles.dateText}>{game.date}</Text>
        </View>
        <View style={styles.historyRight}>
          <View style={styles.historyInfoItem}>
            <IconButton icon="trophy" size={20} color="#4a148c" />
            <Text style={styles.scoreText}>{game.score}</Text>
          </View>
          <View style={styles.historyInfoItem}>
            <IconButton icon="clock" size={20} color="#4a148c" />
            <Text style={styles.durationText}>{game.duration}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}