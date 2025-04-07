import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";
import { useAchievements } from "../context/AchievementsContext";

const TABLET_DEVICE = isTablet();

const LevelProgressBar = () => {
    const { level, xpForNextLevel, xpProgress } = useAchievements();
    const { colors } = useTheme(); 

    const progressAnim = useSharedValue(0);

    useEffect(() => {
        const progressPercentage = (xpProgress / xpForNextLevel) * 100;
        progressAnim.value = withTiming(progressPercentage, { duration: 1000 });
    }, [xpProgress, xpForNextLevel]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progressAnim.value}%`,
    }));
    const currentLevelNumber = level;
    const nextLevelNumber = level + 1;

    const remainingXP = xpForNextLevel - xpProgress;
    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}> 
            <View style={styles.progressContent}>
                <View style={[styles.levelContainer, { backgroundColor: colors.primary }]}> 
                    <Text style={[styles.currentLevelText, { color: colors.card }]}>{currentLevelNumber}</Text>
                </View>
                <View style={styles.progressSection}>
                    <View style={styles.progressContainer}>
                        <LinearGradient
                            colors={[colors.primary, colors.primary]} 
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.backgroundGradient}
                        />
                        <Animated.View style={[styles.progressBarContainer, animatedStyle]}>
                            <LinearGradient
                                colors={[colors.warning, colors.primary]} 
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.progressGradient}
                            />
                        </Animated.View>
                    </View>
                </View>
                <View style={[styles.nextLevelContainer, { backgroundColor: colors.primary }]}> 
                    <Text style={[styles.nextLevelText, { color: colors.card }]}>{nextLevelNumber}</Text> 
                </View>
            </View>
            <View style={styles.xpContainer}>
                <Text style={[styles.xpText, { color: colors.text }]}> 
                    {remainingXP.toLocaleString()} XP TO LEVEL {nextLevelNumber}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        margin: 10,
    },
    progressContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    levelContainer: {
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    },
    nextLevelContainer: {
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 5,
    },
    currentLevelText: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 16 : 12,
    },
    nextLevelText: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 16 : 12,
    },
    progressSection: {
        flex: 1,
        marginHorizontal: 10,
    },
    progressContainer: {
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    },
    backgroundGradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.3, 
    },
    progressBarContainer: {
        height: '100%',
        borderRadius: 6,
    },
    progressGradient: {
        flex: 1,
        borderRadius: 6,
    },
    xpContainer: {
        marginTop: 4,
    },
    xpText: {
        fontFamily: 'Orbitron-ExtraBold',
        textAlign: 'center',
        fontSize: TABLET_DEVICE ? 12 : 9,
    },
});

export default LevelProgressBar;