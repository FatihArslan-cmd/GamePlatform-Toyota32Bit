import DailyChart from "./components/DailyChart";
import DataList from "./components/DataList";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import React, { useEffect, useState } from "react";
import StatsCards from "./components/StatsCard";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { fetchBingoPlayData } from "./utils/fetchBingoPlayData";

import {
    Surface
} from "react-native-paper";


const StaticsScreen = () => {
    const { colors } = useTheme();

    const [bingoDailyData, setBingoDailyData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDays: 0,
        totalTime: 0,
        averageTime: 0,
        longestSession: 0
    });

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchBingoPlayData({ setIsLoading, setBingoDailyData, setStats });
        setRefreshing(false);
    };

    useEffect(() => {
        fetchBingoPlayData({ setIsLoading, setBingoDailyData, setStats });
    }, []);

    const isEmpty = bingoDailyData.length === 0;

    const contentContainerStyle = (isLoading || isEmpty)
        ? styles.centeredContent
        : styles.dataContent;


    return (
        <Surface style={styles.container}>
            <Header />
            <ScrollView
                style={[styles.scrollView, { backgroundColor: colors.background }]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
                contentContainerStyle={contentContainerStyle}
            >
                 <View style={styles.scrollContentWrapper}>
                    {isLoading ? (
                        <LoadingIndicator/>
                    ) : (
                        isEmpty ? (
                            <EmptyState />
                        ) : (
                            <>
                                <StatsCards stats={stats} />
                                <DailyChart data={bingoDailyData.slice(-7)} />
                                <DataList data={bingoDailyData} />
                            </>
                        )
                    )}
                 </View>
            </ScrollView>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContentWrapper: {
         flexGrow: 1,
         justifyContent: 'center',
    },
    centeredContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
     dataContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 16,
     }
});

export default StaticsScreen;