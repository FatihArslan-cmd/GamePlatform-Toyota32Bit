import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Text,} from 'react-native-paper';
import { styles } from '../../styles';
import { useGameDetails } from '../../context/GameDetailsContext';
import lobbyService from '../../service/service'; // Import lobbyService
import JoinableLobbyCard from '../LobbyCard/JoinableLobbyCard';

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
        <View style={styles.lobbiesContainer}>
            <Button
                mode="contained"
                icon="plus-circle"
                onPress={() => setLobbyModalVisible(true)}
                style={styles.createLobbyButton}
                disabled={loading}
            >
                Create Lobby
            </Button>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                lobbies.map((lobby) => (
                    <JoinableLobbyCard key={lobby.code} lobby={lobby} /> // Using the imported LobbyCard here
                ))
            )}
        </View>
    );
}