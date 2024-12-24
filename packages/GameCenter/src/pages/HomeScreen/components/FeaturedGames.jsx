import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';
import ImageResizer from '@bam.tech/react-native-image-resizer';

// Helper function to get today's date in the desired format
const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(today);
};

const FeaturedGames = ({ games }) => {
  const windowWidth = Dimensions.get('window').width;
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const firstFiveGames = useMemo(() => games.slice(0, 5), [games]);
  const [resizedImages, setResizedImages] = useState({});

  useEffect(() => {
    const loadAndResizeImages = async () => {
      const resized = {};
      for (const game of firstFiveGames) {
        try {
          const resizedImage = await ImageResizer.createResizedImage(
            game.thumbnail,
            windowWidth - 32, // Adjust the width as needed
            400, // Adjust the height as needed
            'JPEG',
            100 // Adjust the quality as needed
          );
          resized[game.id] = resizedImage.uri;
        } catch (err) {
          console.error('Error resizing image:', err);
          resized[game.id] = game.thumbnail; // Fallback to original image
        }
      }
      setResizedImages(resized);
    };

    loadAndResizeImages();
  }, [firstFiveGames, windowWidth]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pagerRef.current) {
        const nextPage = currentPage === firstFiveGames.length - 1 ? 0 : currentPage + 1;
        pagerRef.current.setPage(nextPage);
        setCurrentPage(nextPage);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentPage, firstFiveGames.length]);

  const handlePageSelected = useCallback(
    (e) => setCurrentPage(e.nativeEvent.position),
    []
  );

  const GameCard = useCallback(
    ({ game }) => (
      <View key={game.id} style={styles.pageContainer}>
        <Pressable style={styles.gameCard}>
          {resizedImages[game.id] ? (
            <Image
              source={{ uri: resizedImages[game.id] }}
              style={styles.gameImage}
              resizeMode="cover"
            />
          ) : (
            <Text>Loading image...</Text>
          )}
        </Pressable>
      </View>
    ),
    [resizedImages]
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: 33}} />
      <Text style={styles.sectionTitle}>Top Games</Text>
      <Text style={styles.dateText}>{getFormattedDate()}</Text>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={handlePageSelected}
        horizontal
      >
        {firstFiveGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
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
  pagerView: {
    height: 400,
  },
  pageContainer: {
    paddingHorizontal: 16,
    height: '100%',
  },
  gameCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: '100%',
  },
  gameImage: {
    height: '100%',
    width: '100%',
  },
});

export default React.memo(FeaturedGames);
