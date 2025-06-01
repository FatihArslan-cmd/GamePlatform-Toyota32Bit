import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

import {
    Card,
    Title,
    Paragraph,
    Avatar
} from "react-native-paper";

const TABLET_DEVICE = isTablet();

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
                        onPress={() => {}}
                    >
                        <Card.Content style={styles.cardContent}>
                            <Avatar.Icon
                                size={TABLET_DEVICE ? 48 : 40}
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
        padding: TABLET_DEVICE ? 16 : 10,
    },
    sectionTitle: {
        marginBottom: TABLET_DEVICE ? 16 : 12,
        fontSize: TABLET_DEVICE ? 22 : 18,
        fontFamily: 'Orbitron-ExtraBold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        marginBottom: TABLET_DEVICE ? 12 : 8,
        borderRadius: TABLET_DEVICE ? 12 : 8,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: TABLET_DEVICE ? 20 : 16,
        paddingHorizontal: TABLET_DEVICE ? 16 : 12,
    },
    avatar: {
        marginBottom: TABLET_DEVICE ? 12 : 8,
    },
    statValue: {
        fontSize: TABLET_DEVICE ? 24 : 20,
        fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 4,
        textAlign: 'center',
    },
    statTitle: {
        textAlign: 'center',
        fontSize: TABLET_DEVICE ? 14 : 12,
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default StatsCards;