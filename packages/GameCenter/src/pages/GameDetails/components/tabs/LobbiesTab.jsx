import EmptyState from "../../../../components/EmptyState";
import FadeIn from "../../../../components/Animations/FadeInAnimation";
import JoinableLobbyCard from "../LobbyCard/JoinableLobbyCard";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import React, { useCallback, useEffect, useState } from "react";
import lobbyService from "../../service/service";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { useGameDetails } from "../../context/GameDetailsContext";
import { styles } from "../../styles";

const TABLET_DEVICE = isTablet();

export default function LobbiesTab() {
    const { setLobbyModalVisible } = useGameDetails();
    const [lobbies, setLobbies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { colors } = useTheme();
    const { t } = useTranslation();

    const fetchLobbies = useCallback(async () => {
        setError(null);

        try {
            const response = await lobbyService.getLobbies();
            setLobbies(response);
            console.log("Fetched lobbies:", response);
        } catch (error) {
            setError(t('gameDetailsScreen.errorLoadingLobbies') || 'Failed to load lobbies');
            console.error('Error fetching lobbies:', error);
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchLobbies();
    }, [fetchLobbies]);

    const showInitialLoading = loading && lobbies.length === 0 && !error;

    return (
        <ScrollView
            style={styles.lobbiesContainer}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={fetchLobbies}
                    tintColor={colors.text}
                    titleColor={colors.text}
                />
            }
        >
            <Button
                mode="contained"
                icon="plus-circle"
                onPress={() => setLobbyModalVisible(true)}
                style={[styles.createLobbyButton, { backgroundColor: colors.gameDetailsButton }]}
                labelStyle={{ fontSize: TABLET_DEVICE ? 14 : 10, fontFamily: 'Orbitron-ExtraBold' }}
            >
                {t('gameDetailsScreen.createLobby')}
            </Button>

            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                </View>
            ) : showInitialLoading ? (
                <LoadingIndicator />
            ) : lobbies.length === 0 ? (
                <FadeIn>
                    <EmptyState textColor={colors.text} message={t('gameDetailsScreen.noLobbyToJoin')} />
                </FadeIn>
            ) : (
                lobbies.map((lobby, index) => (
                    <FadeIn key={lobby.code} delay={index * 50}>
                        <JoinableLobbyCard
                            lobby={lobby}
                            onLobbyJoined={fetchLobbies}
                        />
                    </FadeIn>
                ))
            )}
        </ScrollView>
    );
}