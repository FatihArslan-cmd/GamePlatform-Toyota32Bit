import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import GameHeader from './components/GameHeader';
import GameCard from './components/GameCard';
import PaginationDots from './components/PaginationDots';
import TopRatedImagePlaceHolder from '../../../../components/SkeletonPlaceHolder/TopRatedImagePlaceHolder';
import { useTheme } from '../../../../context/ThemeContext'; 

const FeaturedGames = React.memo(({ games }) => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { colors } = useTheme(); 
  const themedStyles = styles(colors); 

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
    <View style={themedStyles.container}>
      <GameHeader />
      {games.length > 0 ? (
        <View style={themedStyles.carouselContainer}>
          <PagerView
            ref={pagerRef}
            style={themedStyles.pager}
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

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
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