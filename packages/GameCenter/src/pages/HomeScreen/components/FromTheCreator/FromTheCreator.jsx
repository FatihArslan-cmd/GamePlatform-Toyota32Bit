import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GradientDivider from '../../../../components/GradientDivider';
import GameCard from './components/GameCard';
import gameData from '../GameDetails/gameData.json';
import imageAssets from '../GameDetails/imageAssets';
import GrandientText from '../../../../components/GrandientText';
import PagerView from 'react-native-pager-view';
import PaginationDots from './components/PaginationDots'; 

const FromTheCreator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getImageSource = (imageName) => {
    return imageAssets[imageName] || null;
  };

  const buttonColorSets = [
    ['#FF6F61', '#FFD700'],
    ['#6A5ACD', '#ADD8E6'],
    ['#3CB371', '#90EE90'],
    ['#DA70D6', '#FFB6C1'],
    ['#FFA07A', '#FA8072'],
  ];

  const handlePageScroll = (event) => {
    setActiveIndex(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <GrandientText
        text="From the Creator"
        colors={['black', '#778899']}
        textStyle={{ fontSize: 32 }}
        gradientDirection="horizontal"
        width={400}
      />
      <GradientDivider />

      <View style={styles.pagerContainer}>
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          orientation="horizontal"
          onPageSelected={handlePageScroll}
        >
          {gameData.map((game, index) => (
            <View key={index} style={styles.page}>
              <GameCard
                gameName={game.gameName}
                instructions={game.instructions}
                imageSource={getImageSource(game.imageSource)}
                buttonText="Explore Now"
                buttonColors={buttonColorSets[index % buttonColorSets.length]}
                backgroundColors={game.backgroundColors}
              />
            </View>
          ))}
        </PagerView>

        <PaginationDots 
          activeIndex={activeIndex}
          count={gameData.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginBottom: 16,
  },
  pagerContainer: {
    flex: 1,
  },
  pagerView: {
    height: 350,
    width: '100%',
  },
  page: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FromTheCreator;