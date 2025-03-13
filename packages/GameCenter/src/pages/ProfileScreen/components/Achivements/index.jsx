import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import AchievementCard from './components/AchievementCard';
import OwnedAchievementCard from './components/OwnedAchievementCard';
import ErrorComponents from '../../../../components/ErrorComponents';
import EmptyState from '../../../../components/EmptyState';
import LevelProgressBar from './components/LevelProgressBar';
import { useAchievements } from './context/AchievementsContext';
import { useTheme } from '../../../../context/ThemeContext'; 

const AchievementsPage = () => {
    const { activeTab, setActiveTab, allAchievements, ownedAchievements, loading, error } = useAchievements();
    const { colors } = useTheme(); 

    const renderItem = useCallback(({ item }) => {
        if (activeTab === 'all') {
            return <AchievementCard item={item} colors={colors} />; 
        } else {
            return <OwnedAchievementCard item={item} colors={colors} />; 
        }
    }, [activeTab, colors]);

    const filteredData = useMemo(() => {
        if (activeTab === 'all') {
            return allAchievements;
        } else {
            return ownedAchievements;
        }
    }, [activeTab, allAchievements, ownedAchievements]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <SegmentedButtons
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    {
                        value: 'all',
                        label: 'All Achievements',
                        labelStyle: [styles.buttonLabel, { color: colors.text }], 
                        style: { backgroundColor: colors.card } 
                    },
                    {
                        value: 'owned',
                        label: 'Your Achievements',
                        labelStyle: [styles.buttonLabel, { color: colors.text }], 
                        style: { backgroundColor: colors.card } 
                    },
                ]}
                style={[styles.segmentedButtons, { backgroundColor: colors.buttonBackground }]} 
                theme={{ colors: { primary: colors.primary, surface: colors.card, text: colors.text } }} 
            />
            {activeTab === 'owned' && (
                <LevelProgressBar colors={colors} /> 
            )}
            {loading ? (
                <></>
            ) : error ? (
                <ErrorComponents message={error} />
            ) : (
                <FlashList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={15}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => <EmptyState textColor={colors.text} message="No achievements yet!"/>} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    segmentedButtons: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    buttonLabel: {
        fontFamily: 'Orbitron-ExtraBold',
    }
});

export default AchievementsPage;