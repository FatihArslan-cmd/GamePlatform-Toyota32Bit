import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import FastImage from 'react-native-fast-image';
import { Text, Chip, Divider } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';
import getFormattedDate from '../../../utils/getFormattedDate';
import TopRatedImagePlaceHolder from '../../../components/SkeletonPlaceHolder/TopRatedImagePlaceHolder';
import GradientText from '../../../components/GrandientText';
const FeaturedGames = React.memo(({ games }) => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {games.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentPage && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 85 }}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Top Rated Games</Text>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>
      <Divider style={styles.divider} />
      {games.length > 0 ? (
        <View style={styles.carouselContainer}>
          <PagerView
            ref={pagerRef}
            style={styles.pager}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            {games.map((item) => (
              <View key={item.id} style={styles.page}>
                <View style={styles.cardContainer}>
                  <FastImage
                    source={{ uri: item.background_image }}
                    style={styles.image}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'transparent']}
                    style={styles.gradient}
                  >
                    <View style={styles.infoContainer}>
                      <Text style={styles.gameTitle}>{item.name}</Text>
                      <View style={styles.statsContainer}>
                        <Chip style={styles.chip} textStyle={styles.chipText}>
                          ★ {item.rating}
                        </Chip>
                        <Chip style={styles.chip} textStyle={styles.chipText}>
                          {item.ratings_count} ratings
                        </Chip>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            ))}
          </PagerView>
          {renderPaginationDots()}
        </View>
      ) : (
        <TopRatedImagePlaceHolder />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  divider: {
    height: 3,
    borderRadius: 1,
    width: '100%',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 28,
    color: '#1a1a1a',
    letterSpacing: -0.5,
    fontFamily: 'Orbitron-VariableFont_wght',

  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Orbitron-VariableFont_wght',

  },
  carouselContainer: {
    height: Dimensions.get('window').height * 0.55,
    position: 'relative',
  },
  pager: {
    flex: 1,
  },
  page: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoContainer: {
    padding: 20,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FeaturedGames;
