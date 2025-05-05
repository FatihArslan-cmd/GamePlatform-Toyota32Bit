import EmptyState from "../../../../components/EmptyState";
import ErrorComponents from "../../../../components/ErrorComponents";
import FadeIn from "../../../../components/Animations/FadeInAnimation";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import React, { useEffect, useState } from "react";
import formatDate from "../../../../utils/FormatDate";
import lobbyService from "../../service/service";
import { View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { styles } from "../../styles";

const TABLET_DEVICE = isTablet();

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
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorComponents />;
  }

  if (gameHistory.length === 0) {
    return (
        <EmptyState/>
    );
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
  const gameTime = formatDate(game.gameEndTime, true).split(' ')[1]; 
  const { colors } = useTheme(); 

  return (
    <Card style={[styles.historyCard, { backgroundColor: colors.card }]}> 
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyLeft}>
          <Text style={[
            styles.resultText,
            { color: isWon ? colors.success : colors.error } 
          ]}>
            {game.result}
          </Text>
          <Text style={[styles.dateText, { color: colors.subText }]}>{gameDate}</Text>
        </View>
        <View style={styles.historyRight}>
          <View style={styles.historyInfoItem}>
            <IconButton icon="trophy" size={TABLET_DEVICE ? 20 :16} iconColor={colors.primary} />
            <Text style={[styles.scoreText, { color: colors.text }]}>{game.lobbyName}</Text> 
          </View>
          <View style={styles.historyInfoItem}>
            <IconButton icon="clock" size={TABLET_DEVICE ? 20 :16} iconColor={colors.primary} /> 
            <Text style={[styles.durationText, { color: colors.subText }]}>{gameTime}</Text> 
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}