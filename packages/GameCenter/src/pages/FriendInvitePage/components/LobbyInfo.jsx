import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Surface } from 'react-native-paper';
import FadeIn from '../../../components/Animations/FadeInAnimation';
import { useFriendInvite } from '../context/FriendInviteContext'; 
import { useTheme } from '../../../context/ThemeContext';

const LobbyInfo = () => {
    const { userLobby } = useFriendInvite(); 
    const { colors } = useTheme(); 

    if (!userLobby) {
        return null; 
    }

    return (
        <FadeIn>
            <Surface style={[styles.surface, { backgroundColor: colors.background }]} elevation={4}> {/* Theme background for Surface */}
                <Card style={[styles.card, { backgroundColor: colors.card }]}> 
                    <Card.Content style={styles.cardContent}>
                        <Text variant="titleMedium" style={[styles.title, { color: colors.primary }]}> {/* Theme primary color */}
                            Lobi Bilgisi
                        </Text>
                        <Text variant="bodyLarge" style={[styles.lobbyName, { color: colors.text }]}> {/* Theme text color */}
                            {userLobby.lobbyName}
                        </Text>
                        <Text variant="bodyMedium" style={[styles.availableSpots, { color: colors.success }]}> {/* Theme success color */}
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
        borderRadius: 12,
    },
    cardContent: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 8,
    },
    lobbyName: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: 20,
        marginBottom: 12,
    },
    availableSpots: {
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default LobbyInfo;