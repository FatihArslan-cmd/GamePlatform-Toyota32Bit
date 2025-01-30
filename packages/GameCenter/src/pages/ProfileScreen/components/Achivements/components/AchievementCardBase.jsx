import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';

const AchievementCardBase = ({ item, isOwned = false }) => {
    const theme = useTheme();

    const getRarityStyle = () => {
        switch (item.rarity) {
            case 'Rare':
                return { color: theme.colors.secondary, fontWeight: 'bold' };
            case 'Uncommon':
                return { color: '#2ecc71', fontWeight: 'bold' };
            case 'Epic':
                return { color: '#9b59b6', fontWeight: 'bold' };
            case 'Legendary':
                return { color: '#f1c40f', fontWeight: 'bold' };
            default:
                return { color: theme.colors.surfaceVariant };
        }
    };

    return (
        <Card style={styles.card} mode="outlined">
            <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <View
                        style={[
                            styles.userIconWrapper,
                            { backgroundColor: item.color },
                        ]}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text variant="titleMedium" style={styles.title}>{item.title}</Text>
                    <Text variant="bodyMedium" style={styles.description}>{item.description}</Text>
                    <View style={styles.detailsContainer}>
                        <Text variant="labelMedium" style={[styles.rarity, getRarityStyle()]}>
                            {item.rarity}
                        </Text>
                        <View style={styles.xpContainer}>
                            <IconButton
                                icon="star"
                                size={16}
                                iconColor={theme.colors.primary}
                                style={styles.xpIcon}
                            />
                            <Text variant="labelMedium" style={styles.xp}>
                                {item.xp} XP
                            </Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius:20
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    iconContainer: {
        marginRight: 12,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
    },
    userIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'SQR721B',
    },
    description: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 2,
        fontFamily: 'SQR721B',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rarity: {
        marginRight: 8,
        fontFamily: 'SQR721B',
    },
    xpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    xpIcon: {
        margin: 0,
        padding: 0,
    },
    xp: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginLeft: -4,
        fontFamily: 'SQR721B',
    },
});

export default AchievementCardBase;