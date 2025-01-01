import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import GameHeader from './GameHeader';
import GameCard from './GameCard';
import PaginationDots from './PaginationDots';
import TopRatedImagePlaceHolder from '../../../../components/SkeletonPlaceHolder/TopRatedImagePlaceHolder';

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
      <GameHeader />
      {games.length > 0 ? (
        <View style={styles.carouselContainer}>
          <PagerView
            ref={pagerRef}
            style={styles.pager}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            {games.map((item) => (
              <GameCard key={item.id} game={item} />
            ))}
          </PagerView>
          <PaginationDots games={games} currentPage={currentPage} />
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
    backgroundColor: '#ffffff',
  },
  carouselContainer: {
    height: Dimensions.get('window').height * 0.55,
    position: 'relative',
  },
  pager: {
    flex: 1,
  },
});

export default FeaturedGames;