import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import AchievementCard from './components/AchievementCard';
import OwnedAchievementCard from './components/OwnedAchievementCard';
import ErrorComponents from '../../../../components/ErrorComponents';
import EmptyState from '../../../../components/EmptyState';
import { getAchievements, getOwnedAchievements } from './services/service';

const AchievementsPage = ({ onAchievementCountChange }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [allAchievements, setAllAchievements] = useState([]);
    const [ownedAchievements, setOwnedAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAchievements = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [allAchievementsData, ownedAchievementsData] = await Promise.all([
                getAchievements(),
                getOwnedAchievements(),
            ]);

            setAllAchievements(allAchievementsData);
            setOwnedAchievements(ownedAchievementsData);
             const ownedCount = ownedAchievementsData.length;
            onAchievementCountChange(ownedCount);
            
        } catch (err) {
            console.error("Error fetching achievements:", err);
             setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, [onAchievementCountChange]);

    useEffect(() => {
        fetchAchievements();
    }, [fetchAchievements]);

  const renderItem = useCallback(({ item }) => {
      if (activeTab === 'all') {
          return <AchievementCard item={item} />;
      } else {
          return <OwnedAchievementCard item={item} />;
      }
  }, [activeTab]);


  const filteredData = useMemo(() => {
    if (activeTab === 'all') {
        return allAchievements;
    } else {
        return ownedAchievements;
    }
}, [activeTab, allAchievements, ownedAchievements]);
    

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
            {loading ? (
                <></>
            ) : error ? (
                <ErrorComponents errorMessage={error} width={300} height={300} />
            ) : (
                <FlashList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={15}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => <EmptyState message="Henüz bir başarımınız bulunmamaktadır." />}
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
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default AchievementsPage;