import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import AchievementCard from './components/AchievementCard';
import EmptyState from './components/EmptyState';
import { achievementsData } from './components/achievementsData';

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

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
        data={activeTab === 'owned' ? [] : achievementsData}
        renderItem={({ item }) => <AchievementCard item={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={150}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyState}
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