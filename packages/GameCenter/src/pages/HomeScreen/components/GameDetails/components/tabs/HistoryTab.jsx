import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { styles } from '../../styles';
import FadeIn from '../../../../../../components/Animations/FadeInAnimation';
import lobbyService from '../../service/service';
import formatDate from '../../../../../../utils/FormatDate';
import LoadingIndicator from '../../../../../../components/LoadingIndicator';
import ErrorComponents from '../../../../../../components/ErrorComponents';

export default function HistoryTab() {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const historyData = await lobbyService.getGameHistory();
        setGameHistory(historyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameHistory();
  }, []);

  if (loading) {
    return <LoadingIndicator />
     
  }

  if (error) {
    return <ErrorComponents />;
  }

  return (
    <FadeIn>
      <View style={styles.historyContainer}>
        {gameHistory.map((game, index) => (
          <GameHistoryCard key={index} game={game} />
        ))}
      </View>
    </FadeIn>
  );
}

function GameHistoryCard({ game }) {
  const isWon = game.result === 'Bingo Kazandı';
  const gameDate = formatDate(game.gameEndTime);
  const gameTime = formatDate(game.gameEndTime, true).split(' ')[1]; // Extract time part

  return (
    <Card style={styles.historyCard}>
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyLeft}>
          <Text style={[
            styles.resultText,
            { color: isWon ? '#4CAF50' : '#F44336' }
          ]}>
            {game.result}
          </Text>
          <Text style={styles.dateText}>{gameDate}</Text>
        </View>
        <View style={styles.historyRight}>
          <View style={styles.historyInfoItem}>
            <IconButton icon="trophy" size={20} color="#4a148c" />
            <Text style={styles.scoreText}>{game.lobbyName}</Text>
          </View>
          <View style={styles.historyInfoItem}>
            <IconButton icon="clock" size={20} color="#4a148c" />
            <Text style={styles.durationText}>{gameTime}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}