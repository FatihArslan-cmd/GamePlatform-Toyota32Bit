import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../../styles';
import { useGameDetails } from '../../context/GameDetailsContext';
import lobbyService from '../../service/service'; // Import lobbyService
import JoinableLobbyCard from '../LobbyCard/JoinableLobbyCard';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import FadeIn from '../../../../components/Animations/FadeInAnimation'; // Import FadeInAnimation
import EmptyState from '../../../../components/EmptyState';

export default function LobbiesTab() {
    const { setLobbyModalVisible } = useGameDetails();
    const [lobbies, setLobbies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLobbies = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await lobbyService.getLobbies(); // Use lobbyService to fetch lobbies
                setLobbies(response); // Assuming lobbyService.getLobbies returns the array of lobbies directly
                console.log(response);
            } catch (error) {
                setError('Failed to load lobbies');
                console.error('Error fetching lobbies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLobbies();
    }, []);

    return (
        <ScrollView style={styles.lobbiesContainer}>
            <Button
                mode="contained"
                icon="plus-circle"
                onPress={() => setLobbyModalVisible(true)}
                style={styles.createLobbyButton}
            >
                Create Lobby
            </Button>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <LoadingIndicator  />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : lobbies.length === 0 ? ( // Check if lobbies array is empty
                <FadeIn>
                    <EmptyState message="Şu anda katılabileceğiniz lobi bulunmamaktadır." />
                </FadeIn>
            ) : (
                lobbies.map((lobby, index) => (
                    <FadeIn key={lobby.code} delay={index * 50}>
                        <JoinableLobbyCard lobby={lobby} />
                    </FadeIn>
                ))
            )}
        </ScrollView>
    );
}