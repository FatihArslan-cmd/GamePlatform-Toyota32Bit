import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GradientDivider from '../../../../components/GradientDivider';
import GameCard from './components/GameCard';
import gameData from '../../../GameDetails/utils/gameData.json';
import imageAssets from '../../../GameDetails/utils/imageAssets';
import GrandientText from '../../../../components/GrandientText';
import PagerView from 'react-native-pager-view';
import PaginationDots from './components/PaginationDots';
import { useTheme } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const FromTheCreator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();
  const themedStyles = useStyles(colors);
  const { t } = useTranslation();

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
    <View style={themedStyles.container}>
      <GrandientText
        text={t('homeScreen.fromTheCreator')}
        colors={colors.themeTextGradient} 
        textStyle={{ fontSize: 32 }}
        gradientDirection="horizontal"
        width={400}
      />
      <GradientDivider />

      <View style={themedStyles.pagerContainer}>
        <PagerView
          style={themedStyles.pagerView}
          initialPage={0}
          orientation="horizontal"
          onPageSelected={handlePageScroll}
        >
          {gameData.map((game, index) => (
            <View key={index} style={themedStyles.page}>
              <GameCard
                gameName={game.gameName}
                instructions={game.instructions}
                imageSource={getImageSource(game.imageSource)}
                buttonText={t('homeScreen.exploreNow')}
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

const useStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background, 
  },
  title: {
    fontSize: 28,
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.text, 
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