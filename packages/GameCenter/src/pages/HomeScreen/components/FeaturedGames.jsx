import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text as RNText } from 'react-native';
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
      <View style={{ marginTop: 50 }} />
      <Title style={styles.sectionTitle}>Top Games</Title>
      <Text style={styles.dateText}>{getFormattedDate()}</Text>
      {games.length > 0 ? (
        <PagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {games.map((item) => (
            <View key={item.id} style={styles.page}>
              <FastImage
                source={{ uri: item.background_image }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <View style={styles.infoOverlay}>
                  <RNText style={styles.gameTitle}>{item.name}</RNText>
                  <View style={styles.statsContainer}>
                    <RNText style={styles.infoText}>Rating: {item.rating}</RNText>
                    <RNText style={styles.infoText}>
                      Ratings Count: {item.ratings_count}
                    </RNText>
                    <RNText style={styles.infoText}>
                      Updated: {item.updated}
                    </RNText>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  pager: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
    color: '#1a1a1a',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 20,
    color: '#555',
  },
  page: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 400,
    borderRadius: 20,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: '8%',
    width: '84%',
  },
  infoOverlay: {
    backgroundColor: 'rgba(32, 32, 32, 0.85)',
    borderRadius: 12,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  gameTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statsContainer: {
    gap: 4,
  },
  infoText: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FeaturedGames;