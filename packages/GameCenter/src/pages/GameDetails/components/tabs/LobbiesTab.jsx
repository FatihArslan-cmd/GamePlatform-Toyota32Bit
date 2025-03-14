import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../../styles';
import { useGameDetails } from '../../context/GameDetailsContext';
import lobbyService from '../../service/service'; 
import JoinableLobbyCard from '../LobbyCard/JoinableLobbyCard';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import FadeIn from '../../../../components/Animations/FadeInAnimation'; 
import EmptyState from '../../../../components/EmptyState';
import { useTheme } from '../../../../context/ThemeContext';

export default function LobbiesTab() {
    const { setLobbyModalVisible } = useGameDetails();
    const [lobbies, setLobbies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { colors } = useTheme(); 

    useEffect(() => {
        const fetchLobbies = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await lobbyService.getLobbies(); 
                setLobbies(response); 
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
                style={[styles.createLobbyButton, { backgroundColor: colors.gameDetailsButton }]} 
            >
                Create Lobby
            </Button>
            {loading ? (
                    <LoadingIndicator  />
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : lobbies.length === 0 ? ( 
                <FadeIn>
                    <EmptyState textColor={colors.text} message="Şu anda katılabileceğiniz lobi bulunmamaktadır." />
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