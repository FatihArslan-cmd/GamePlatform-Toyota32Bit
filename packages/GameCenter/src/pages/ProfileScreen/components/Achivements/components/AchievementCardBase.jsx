import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { ToastService } from "../../../../../context/ToastService";
import { isTablet } from "../../../../../utils/isTablet";
import { useAchievements } from "../context/AchievementsContext";
import { addAchievement } from "../services/service";

const TABLET_DEVICE = isTablet(); 

const AchievementCardBase = ({ item: propItem, isOwned }) => {
    const { colors } = useTheme();
    const { allAchievements } = useAchievements();

    const item = allAchievements.find(achievement => achievement.id === propItem.id);

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
                    <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                    <Text  style={[styles.description, { color: colors.subText }]}>{item.description}</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.rarity, getRarityStyle()]}>
                            {item.rarity}
                        </Text>
                        <View style={styles.xpContainer}>
                            <IconButton
                                icon="star"
                                size={16}
                                iconColor={colors.primary}
                                style={styles.xpIcon}
                            />
                            <Text style={[styles.xp, { color: colors.subText }]}>
                                {item.xp} XP
                            </Text>
                        </View>
                    </View>
                </View>
                {!isOwned && (
                    <IconButton
                        icon={() => <Icon name="plus" size={TABLET_DEVICE ? 24 : 18} color={colors.primary} />}
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
        justifyContent: 'space-between'
    },
    iconContainer: {
        marginRight: 12,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
    },
    userIconWrapper: {
        width: TABLET_DEVICE ? 48 : 36,
        height: TABLET_DEVICE ? 48 : 36,
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
        fontSize: TABLET_DEVICE ? 18 : 12,
    },
    description: {
        marginTop: 2,
        fontFamily: 'SQR721B',
        fontSize: TABLET_DEVICE ? 16 : 11,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rarity: {
        marginRight: 8,
        fontFamily: 'SQR721B',
        fontSize: TABLET_DEVICE ? 16 : 11,

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
        fontSize: TABLET_DEVICE ? 16 : 11,
    },
    addButton: {
        margin: 0,
        padding: 0,
    }
});

export default AchievementCardBase;