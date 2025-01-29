import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import AchievementCard from './components/AchievementCard';
import OwnedAchievementCard from './components/OwnedAchievementCard';
import { achievementsData } from './components/achievementsData';

const AchievementsPage = ({ onAchievementCountChange }) => {
    const [activeTab, setActiveTab] = useState('all');

    const renderItem = ({ item }) => {
        if (activeTab === 'all') {
            return <AchievementCard item={item} />;
        } else {
            return <OwnedAchievementCard item={item} />;
        }
    };

    const getFilteredData = () => {
        if (activeTab === 'all') {
            return achievementsData;
        } else {
            return achievementsData.filter((achievement) => achievement.owned);
        }
    };

    const calculateOwnedAchievementsCount = () => {
        return achievementsData.filter(achievement => achievement.owned).length;
    };

    useEffect(() => {
        const ownedCount = calculateOwnedAchievementsCount();
        onAchievementCountChange(ownedCount);
    }, [achievementsData, onAchievementCountChange]);

    return (
        <View style={[styles.container, { backgroundColor: '#1e1e1e' }]}>
            <SegmentedButtons
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    { value: 'all', label: 'All Achievements' },
                    { value: 'owned', label: 'Your Achievements' },
                ]}
                style={styles.segmentedButtons}
            />
            <FlashList
                data={getFilteredData()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                estimatedItemSize={150}
                contentContainerStyle={styles.listContainer}
            />
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
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default AchievementsPage;