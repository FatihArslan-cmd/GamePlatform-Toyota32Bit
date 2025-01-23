import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Text, Badge, IconButton } from 'react-native-paper';
import { styles } from '../../styles';
import { useGameDetails } from '../../context/GameDetailsContext';
import axios from 'axios';
import { getToken } from '../../../../../../shared/states/api';

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
                const token = getToken();
                const response = await axios.get('http://10.0.2.2:3000/api/lobby/list', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setLobbies(response.data.lobbies);
                console.log(response.data.lobbies);
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
                    <LobbyCard key={lobby.code} lobby={lobby} />
                ))
            )}
        </View>
    );
}

function LobbyCard({ lobby }) {
    const isLobbyInProgress = () => {
        return lobby.startDate !== null && lobby.endDate !== null;
    };

    return (
        <Card style={styles.lobbyCard}>
            <Card.Content style={styles.lobbyContent}>
                <View style={styles.lobbyHeader}>
                    <Title style={styles.lobbyName}>{lobby.lobbyName}</Title>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.lobbyInfoText}>{lobby.lobbyType}</Text>
                    </View>
                </View>
                <View style={styles.lobbyInfo}>
                    <View style={styles.lobbyInfoItem}>
                        <IconButton icon="crown" size={20} color="#4a148c" />
                        <Text style={styles.lobbyInfoText}>{lobby.ownerId}</Text>
                    </View>
                    <View style={styles.lobbyInfoItem}>
                        <IconButton icon="account" size={20} color="#4a148c" />
                        <Text style={styles.lobbyInfoText}>
                            {lobby.members.length}/{lobby.maxCapacity}
                        </Text>
                    </View>
                    {lobby.lobbyType === 'event' && (
                         <View>
                             {lobby.startDate && (
                                 <View style={styles.lobbyInfoItem}>
                                <IconButton icon="calendar-start" size={20} color="#4a148c" />
                                     <Text style={styles.lobbyInfoText}>
                                         {new Date(lobby.startDate).toLocaleString()}
                                     </Text>
                                 </View>
                             )}
                            {lobby.endDate && (
                             <View style={styles.lobbyInfoItem}>
                              <IconButton icon="calendar-end" size={20} color="#4a148c" />
                                 <Text style={styles.lobbyInfoText}>
                                     {new Date(lobby.endDate).toLocaleString()}
                                 </Text>
                              </View>
                            )}
                        </View>
                    )}
                </View>
                <Button
                    mode="outlined"
                    onPress={() => {
                        console.log('Join button clicked for lobby:', lobby.code);
                    }}
                    style={styles.joinButton}
                    disabled={isLobbyInProgress()}
                >
                    {isLobbyInProgress() ? 'In Progress' : 'Join'}
                </Button>
            </Card.Content>
        </Card>
    );
}