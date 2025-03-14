import React from 'react';
import { StyleSheet, View } from 'react-native';
import RoomList from './components/RoomList';
import CommunityTopics from './components/CommunityTopics';
import EmptyState from '../../../../components/EmptyState';
import { ExplorerLoadingSkeleton } from './components/ExplorerLoadingScreen';
import { ExplorerProvider, useExplorer } from './context/ExplorerContext';
import { useTheme } from '../../../../context/ThemeContext'; 

const ExplorerScreenContent = () => {
  const {
    loading,
    error,
  } = useExplorer();
  const { colors } = useTheme();
  const styles = createStyles(colors);

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <View style={styles.communityTopicsWrapper}>
          <CommunityTopics showAllButton={true} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ExplorerLoadingSkeleton />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <EmptyState message="No Community" />
          </View>
        ) : (
          <RoomList/>
        )}
      </View>
    );
  };

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  communityTopicsWrapper: {
  marginVertical:10,
    padding: 0
},

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: 'center'
    }
});


const ExplorerScreen = () => (
    <ExplorerProvider>
        <ExplorerScreenContent />
    </ExplorerProvider>
);

export default ExplorerScreen;