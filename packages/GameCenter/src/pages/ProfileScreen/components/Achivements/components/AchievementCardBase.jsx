import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addAchievement } from '../services/service';
import { ToastService } from '../../../../../context/ToastService';
import { useAchievements } from '../context/AchievementsContext';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const AchievementCardBase = ({ item: propItem, isOwned }) => {
    const { colors } = useTheme();
    const { allAchievements } = useAchievements();

    const item = allAchievements.find(achievement => achievement.id === propItem.id);

    if (!item) {
        return <Text style={{color: colors.text}}>Achievement not found</Text>;
    }

    const getRarityStyle = () => {
        switch (item.rarity) {
            case 'Rare':
                return { color: colors.warning, fontWeight: 'bold' };
            case 'Uncommon':
                return { color: colors.success, fontWeight: 'bold' };
            case 'Epic':
                return { color: colors.error, fontWeight: 'bold' };
            case 'Legendary':
                return { color: colors.primary, fontWeight: 'bold' };
            default:
                return { color: colors.subText };
        }
    };

    const handleAddAchievement = async () => {
        try {
            const response = await addAchievement(item.id);
            if (response.message === 'Achievement updated successfully.' || response.message === "User already has this achievement.") {
                ToastService.show("success", "Achievement added successfully");
            } else {
                ToastService.show("error", "Failed to add achievement. Please try again later.");
            }
        } catch (error) {
            console.error("Error adding achievement:", error);
            ToastService.show("error", "Failed to add achievement. Please try again later.");
        }
    };

    return (
        <Card style={[styles.card, { backgroundColor: colors.achivementsCard }]} mode="outlined">
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
                    <Text variant="titleMedium" style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                    <Text variant="bodyMedium" style={[styles.description, { color: colors.subText }]}>{item.description}</Text>
                    <View style={styles.detailsContainer}>
                        <Text variant="labelMedium" style={[styles.rarity, getRarityStyle()]}>
                            {item.rarity}
                        </Text>
                        <View style={styles.xpContainer}>
                            <IconButton
                                icon="star"
                                size={16}
                                iconColor={colors.primary}
                                style={styles.xpIcon}
                            />
                            <Text variant="labelMedium" style={[styles.xp, { color: colors.subText }]}>
                                {item.xp} XP
                            </Text>
                        </View>
                    </View>
                </View>
                {!isOwned && (
                    <IconButton
                        icon={() => <Icon name="plus" size={24} color={colors.primary} />}
                        onPress={handleAddAchievement}
                        style={styles.addButton}
                    />
                )}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        borderRadius: 20,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        justifyContent: 'space-between'
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
        fontFamily: 'SQR721B',
    },
    description: {
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
        marginLeft: -4,
        fontFamily: 'SQR721B',
    },
    addButton: {
        margin: 0,
        padding: 0,
    }
});

export default AchievementCardBase;