import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

import {
    Card,
    Title,
    Paragraph,
    Avatar
} from "react-native-paper";


const StatsCards = ({ stats }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const statsData = [
        {
            title: t('StaticsScreen.totalDays'),
            value: stats.totalDays,
            icon: "calendar-today",
            color: "#3340D6",
        },
        {
            title: t('StaticsScreen.totalTime'),
            value: `${stats.totalTime} ${t('StaticsScreen.min')}`, 
            icon: "clock-outline",
            color: "#4CAF50",
        },
        {
            title: t('StaticsScreen.average'),
            value: `${stats.averageTime} ${t('StaticsScreen.min')}`, 
            icon: "trending-up",
            color: "#FF9800",
        },
        {
            title: t('StaticsScreen.longest'),
            value: `${stats.longestSession} ${t('StaticsScreen.min')}`,
            icon: "trophy-outline",
            color: "#F44336",
        }
    ];

    return (
        <View style={styles.container}>
            <Title style={[styles.sectionTitle, { color: colors.text }]}>
                {t('StaticsScreen.summaryStatics')}
            </Title>

            <View style={styles.gridContainer}>
                {statsData.map((stat, index) => (
                    <Card
                        key={index}
                        style={[
                            styles.statCard,
                            { backgroundColor: colors.card }
                        ]}
                    >
                        <Card.Content style={styles.cardContent}>
                            <Avatar.Icon
                                size={48}
                                icon={stat.icon}
                                style={[
                                    styles.avatar,
                                    { backgroundColor: stat.color }
                                ]}
                                color="#FFFFFF"
                            />
                            <Title style={[
                                styles.statValue,
                                { color: stat.color }
                            ]}>
                                {stat.value}
                            </Title>
                            <Paragraph style={[
                                styles.statTitle,
                                { color: colors.text + 'BB' }
                            ]}>
                                {stat.title}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 16,
        fontSize: 22,
        fontFamily: 'Orbitron-ExtraBold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        marginBottom: 12,
        borderRadius: 12,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    avatar: {
        marginBottom: 12,
    },
    statValue: {
        fontSize: 24,
        fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 4,
        textAlign: 'center',
    },
    statTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default StatsCards;