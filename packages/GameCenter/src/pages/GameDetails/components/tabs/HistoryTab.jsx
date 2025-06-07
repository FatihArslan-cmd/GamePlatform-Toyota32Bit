import EmptyState from "../../../../components/EmptyState";
import ErrorComponents from "../../../../components/ErrorComponents";
import FadeIn from "../../../../components/Animations/FadeInAnimation";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import React, { useCallback, useEffect, useState } from "react";
import formatDate from "../../../../utils/FormatDate";
import lobbyService from "../../service/service";
import { RefreshControl, ScrollView, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { styles } from "../../styles";

const TABLET_DEVICE = isTablet();

export default function HistoryTab() {
    const [gameHistory, setGameHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { colors } = useTheme();

    const fetchGameHistory = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchGameHistory();
    }, [fetchGameHistory]);

    const showInitialLoading = loading && gameHistory.length === 0 && !error;

    return (
        <ScrollView
            style={styles.historyContainer}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={fetchGameHistory}
                    tintColor={colors.text}
                    titleColor={colors.text}
                    // colors={[colors.primary]}
                    // progressBackgroundColor={colors.surface}
                />
            }
        >
            <FadeIn>
                {showInitialLoading ? (
                    <LoadingIndicator />
                ) : error ? (
                    <ErrorComponents />
                ) : gameHistory.length === 0 ? (
                    <EmptyState />
                ) : (
                    gameHistory.map((game, index) => (
                        <GameHistoryCard key={index} game={game} />
                    ))
                )}
            </FadeIn>
        </ScrollView>
    );
}

function GameHistoryCard({ game }) {
    const isWon = game.result === 'Won Bingo';
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
                        <IconButton icon="trophy" size={TABLET_DEVICE ? 20 : 16} iconColor={colors.primary} />
                        <Text style={[styles.scoreText, { color: colors.text }]}>{game.lobbyName}</Text>
                    </View>
                    <View style={styles.historyInfoItem}>
                        <IconButton icon="clock" size={TABLET_DEVICE ? 20 : 16} iconColor={colors.primary} />
                        <Text style={[styles.durationText, { color: colors.subText }]}>{gameTime}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}