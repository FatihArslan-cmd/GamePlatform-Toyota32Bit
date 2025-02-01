import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import AchievementCard from './components/AchievementCard';
import OwnedAchievementCard from './components/OwnedAchievementCard';
import ErrorComponents from '../../../../components/ErrorComponents';
import { getToken } from '../../../../shared/states/api';
import EmptyState from '../../../../components/EmptyState';


const AchievementsPage = ({ onAchievementCountChange }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [allAchievements, setAllAchievements] = useState([]);
    const [ownedAchievements, setOwnedAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAchievements = useCallback(async () => {
      setLoading(true);
      setError(null);
      const token = getToken();
      try {
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          };

          const responseAll = await fetch('http://10.0.2.2:3000/api/achievements', { headers });
          const responseOwned = await fetch('http://10.0.2.2:3000/api/achievements/owned', { headers });


            if (!responseAll.ok || !responseOwned.ok) {
              throw new Error(`HTTP error! Status: ${responseAll.status} or ${responseOwned.status}`);
            }
            
            const dataAll = await responseAll.json();
            const dataOwned = await responseOwned.json();
            console.log(dataOwned)
            setAllAchievements(dataAll);
            setOwnedAchievements(dataOwned);
            const ownedCount = dataOwned.length;
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