import FadeIn from "../../../components/Animations/FadeInAnimation";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card, Surface, Text } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useFriendInvite } from "../context/FriendInviteContext";

const TABLET_DEVICE = isTablet();

const LobbyInfo = () => {
    const { userLobby } = useFriendInvite();
    const { colors } = useTheme();
    const { t } = useTranslation(); 

    if (!userLobby) {
        return null;
    }

    return (
        <FadeIn>
            <Surface style={[styles.surface, { backgroundColor: colors.background }]} elevation={4}>
                <Card style={[styles.card, { backgroundColor: colors.card }]}>
                    <Card.Content style={styles.cardContent}>
                        <Text variant="titleMedium" style={[styles.title, { color: colors.primary }]}>
                            {t('friendInvitePage.lobbyInfoTitle')}
                        </Text>
                        <Text variant="bodyLarge" style={[styles.lobbyName, { color: colors.text }]}>
                            {userLobby.lobbyName}
                        </Text>
                        <Text variant="bodyMedium" style={[styles.availableSpots, { color: colors.success }]}>
                            {userLobby.maxCapacity - userLobby.members.length} {t('friendInvitePage.availableSpotsText')} 
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
        padding: TABLET_DEVICE ? 16 : 12,
    },
    title: {
        fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 8,
    },
    lobbyName: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 20 : 16,
        marginBottom: 12,
    },
    availableSpots: {
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default LobbyInfo;