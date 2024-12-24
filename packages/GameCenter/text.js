import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';
import FastImage from 'react-native-fast-image';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import getFormattedDate from '../../../utils/getFormattedDate';

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
            game.image,
            windowWidth - 32,
            400,
            'JPEG',
            100
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
            <FastImage
              source={{ uri: resizedImages[game.id] }}
              style={styles.gameImage}
              resizeMode={FastImage.resizeMode.cover}
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
      <View style={{ marginTop: 33 }} />
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

import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, Text } from "react-native";

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://rawg.io/api/games?token&key=3617c23566704a0590d99135fcd3491f"
        );
        const data = await response.json();
        setGames(data.results); // API'nin 'results' alanı oyun listesi içeriyor.
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.background_image }}
            style={styles.image}
          />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: "90%", // Ekran genişliğine uyumlu yap
    height: "444",
    borderRadius: 55,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;

