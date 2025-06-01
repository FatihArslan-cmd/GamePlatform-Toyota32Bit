import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

import {
    Card,
    Title,
    Text,
    Chip
} from "react-native-paper";

const TABLET_DEVICE = isTablet();

const DailyChart = ({ data }) => {
    const { colors, resolvedTheme } = useTheme();
    const maxDuration = data && data.length > 0 ? Math.max(...data.map(item => item.duration), 1) : 1;
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    };

    const gradientColors = resolvedTheme === 'dark'
        ? colors.dividerGradientDark
        : colors.dividerGradientLight;


    if (!data || data.length === 0) {
        return (
             <Card style={[styles.container, { backgroundColor: colors.card }]} elevation={3}>
                <Card.Content>
                    <View style={styles.header}>
                         <Title style={[styles.title, { color: colors.text }]}>{t('StaticsScreen.last7DaysActivity')}</Title>
                         <Chip
                            icon="chart-bar"
                            mode="outlined"
                            compact
                            style={styles.headerChip}
                            textStyle={styles.headerChipText}
                         >
                            {t('StaticsScreen.daily')}
                         </Chip>
                    </View>
                    <Text style={{ textAlign: 'center', paddingVertical: 20, color: colors.text + 'AA' }}>No activity data available.</Text>
                </Card.Content>
            </Card>
        );
    }

    return (
        <Card style={[styles.container, { backgroundColor: colors.card }]} elevation={3}>
            <Card.Content>
                <View style={styles.header}>
                    <Title style={[styles.title, { color: colors.text }]}>{t('StaticsScreen.last7DaysActivity')}</Title>
                    <Chip
                        icon="chart-bar"
                        mode="outlined"
                        compact
                        style={styles.headerChip}
                        textStyle={styles.headerChipText}
                    >
                        {t('StaticsScreen.daily')}
                    </Chip>
                </View>

                <View style={styles.chartContainer}>
                    {data.map((item, index) => {
                        const duration = typeof item.duration === 'number' ? item.duration : 0;
                        const progress = duration / maxDuration;
                        const barWidth = Math.max(progress * 100, 5);

                        return (
                            <View key={index} style={styles.barRow}>
                                <View style={styles.barContainer}>
                                    <View style={styles.barBackground}>
                                        <LinearGradient
                                            colors={gradientColors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[
                                                styles.gradientBar,
                                                { width: `${barWidth}%` }
                                            ]}
                                        />
                                    </View>
                                    <Chip
                                        style={[styles.durationChip, { backgroundColor: colors.primary + '20' }]}
                                        textStyle={[styles.chipText, { color: colors.primary }]}
                                        compact
                                    >
                                        {duration}{t('StaticsScreen.m')}
                                    </Chip>
                                </View>
                                <Text style={[
                                    styles.dayLabel,
                                    { color: colors.text }
                                ]}>
                                    {formatDate(item.date || '')}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: TABLET_DEVICE ? 16 : 12,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: TABLET_DEVICE ? 20 : 16,
    },
    title: {
        fontSize: TABLET_DEVICE ? 20 : 18,
        fontFamily: 'Orbitron-ExtraBold',
        flexShrink: 1,
        marginRight: 8,
    },
    headerChip: {
        height: 32,
    },
    headerChipText: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: 12,
    },
    chartContainer: {
        paddingVertical: 8,
    },
    barRow: {
        marginBottom: TABLET_DEVICE ? 16 : 12,
        alignItems: 'center',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4,
    },
    barBackground: {
        flex: 1,
        height: TABLET_DEVICE ? 16 : 14,
        backgroundColor: '#E5E5E5',
        borderRadius: 8,
        marginRight: TABLET_DEVICE ? 12 : 8,
        overflow: 'hidden',
    },
    gradientBar: {
        height: '100%',
        borderRadius: 8,
    },
    durationChip: {
        height: TABLET_DEVICE ? 28 : 24,
        minWidth: TABLET_DEVICE ? 50 : 45,
        justifyContent: 'center',
    },
    chipText: {
        fontSize: TABLET_DEVICE ? 12 : 10,
        fontFamily: 'Orbitron-ExtraBold',
        textAlign: 'center',
    },
    dayLabel: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 14 : 12,
        textAlign: 'center',
        marginTop: 2,
    },
});

export default DailyChart;