import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Surface } from 'react-native-paper';
import FadeIn from '../../../components/Animations/FadeInAnimation';
import { useFriendInvite } from '../context/FriendInviteContext'; // Import context hook

const LobbyInfo = () => {
    const { userLobby } = useFriendInvite(); // Get userLobby from context

    if (!userLobby) {
        return null; // or handle the case where userLobby is not available in context
    }

    return (
        <FadeIn>
            <Surface style={styles.surface} elevation={4}>
                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Text variant="titleMedium" style={styles.title}>
                            Lobi Bilgisi
                        </Text>
                        <Text variant="bodyLarge" style={styles.lobbyName}>
                            {userLobby.lobbyName}
                        </Text>
                        <Text variant="bodyMedium" style={styles.availableSpots}>
                            {userLobby.maxCapacity - userLobby.members.length} kişilik boş yer var!
                        </Text>
                    </Card.Content>
                </Card>
            </Surface>
        </FadeIn>
    );
};

const styles = StyleSheet.create({
    surface: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12,
    },
    cardContent: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 8,
        color: '#1a237e',
    },
    lobbyName: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: 20,
        marginBottom: 12,
        color: '#303f9f',
    },
    availableSpots: {
        fontFamily: 'Orbitron-ExtraBold',
        color: '#4caf50',
    },
});

export default LobbyInfo;