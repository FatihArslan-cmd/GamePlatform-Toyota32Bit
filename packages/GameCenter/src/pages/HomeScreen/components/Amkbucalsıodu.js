import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import FastImage from 'react-native-fast-image';
import { Text, Title } from 'react-native-paper';
import getFormattedDate from '../../../utils/getFormattedDate';

const FeaturedGames = React.memo(({ games }) => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = useCallback(() => {
    setCurrentPage((prevPage) => {
      const nextPage = (prevPage + 1) % games.length;
      pagerRef.current?.setPage(nextPage);
      return nextPage;
    });
  }, [games.length]);

  useEffect(() => {
    if (games.length > 0) {
      const interval = setInterval(handlePageChange, 5000);
      return () => clearInterval(interval);
    }
  }, [games.length, handlePageChange]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.sectionTitle}>Top Games</Title>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>
      
      {games.length > 0 ? (
        <PagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {games.map((item) => (
            <View key={item.id} style={styles.page}>
              <View style={styles.imageContainer}>
                <FastImage source={{ uri: item.background_image }} style={styles.image} />
                <View style={styles.overlay}>
                  <Text style={styles.title}>{item.name}</Text>
                  <View style={styles.statsRow}>
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>⭐️ {item.rating}</Text>
                      <Text style={styles.statLabel}>{item.ratings_count} votes</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>
                        {new Date(item.released).toLocaleDateString()}
                      </Text>
                      <Text style={styles.statLabel}>Released</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </PagerView>
      ) : (
        <Text style={styles.noDataText}>No games available</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  pager: {
    flex: 1,
  },
  page: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 55,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '90%',
    height: 400,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 20,
    borderTopRightRadius: 30,
    width: '45%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default FeaturedGames;